import { expect, use as chaiUse } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import ganache from 'ganache'
import { ethers } from 'ethers'
import { LotteryContract } from '.'

const {
  utils: { parseEther },
} = ethers

chaiUse(chaiAsPromised)

// @ts-ignore
const provider = new ethers.providers.Web3Provider(ganache.provider())

const managerId = 0
let lotteryContractAddress: string

describe('Lottery', () => {
  beforeEach(async () => {
    const signer = provider.getSigner(managerId)

    const factory = new ethers.ContractFactory(LotteryContract.abi, LotteryContract.evm.bytecode, signer)
    const lotteryContract = await factory.deploy()

    await lotteryContract.deployed()

    lotteryContractAddress = lotteryContract.address
  })

  it('should deploy a contract', () => {
    expect(lotteryContractAddress).to.not.be.undefined
  })

  it('should assign manager address', async () => {
    const factory = new ethers.Contract(lotteryContractAddress, LotteryContract.abi, provider.getSigner(5))

    const managerAddress = await provider.getSigner(managerId).getAddress()

    const managerStorageAddress = await factory.manager()

    expect(managerAddress).to.equal(managerStorageAddress)
  })

  it('should require the minimum bid to enter', async () => {
    const factory = new ethers.Contract(lotteryContractAddress, LotteryContract.abi, provider.getSigner(6))

    await expect(factory.enter()).to.eventually.be.rejected
  })

  it('should enter lottery if send the minimum bid', async () => {
    const factory = new ethers.Contract(lotteryContractAddress, LotteryContract.abi, provider.getSigner(6))

    await expect(factory.enter({ value: parseEther('1') })).to.eventually.be.fulfilled
  })

  it('should reduce player`s balance after entering the lottery', async () => {
    const signer = provider.getSigner(6)

    const factory = new ethers.Contract(lotteryContractAddress, LotteryContract.abi, signer)

    const signerStartingBalance = await signer.getBalance()

    const { hash, value, gasPrice } = await factory.enter({
      value: parseEther('1'),
    })

    const signerBalance = await signer.getBalance()

    const { gasUsed } = await factory.provider.getTransactionReceipt(hash)

    const totalTransactionGasPrice = gasUsed.mul(gasPrice)

    expect(signerBalance.add(value).add(totalTransactionGasPrice).toBigInt()).to.equal(signerStartingBalance.toBigInt())
  })

  it('should increase tickets count after entering', async () => {
    const factory = new ethers.Contract(lotteryContractAddress, LotteryContract.abi, provider.getSigner(6))

    const ticketsCountBeforeEnter = await factory.getTicketsCount()

    await factory.enter({ value: parseEther('1') })

    const ticketsCountAfterEnter = await factory.getTicketsCount()

    expect(ticketsCountAfterEnter.toNumber()).to.equal(ticketsCountBeforeEnter.add(1).toNumber())
  })

  it('should require manager privileges to be able to pick a winner', async () => {
    const factory = new ethers.Contract(lotteryContractAddress, LotteryContract.abi, provider.getSigner(6))

    await factory.enter({ value: parseEther('1') })

    expect(factory.pickWinner()).to.be.rejected
  })

  it('should winner gets prize', async () => {
    const signer1 = provider.getSigner(1)
    const factory1 = new ethers.Contract(lotteryContractAddress, LotteryContract.abi, signer1)

    const { value: value1 } = await factory1.enter({ value: parseEther('1') })

    const signer2 = provider.getSigner(2)
    const factory2 = new ethers.Contract(lotteryContractAddress, LotteryContract.abi, signer2)

    const { value: value2 } = await factory2.enter({ value: parseEther('2') })

    const factoryManager = new ethers.Contract(lotteryContractAddress, LotteryContract.abi, provider.getSigner(managerId))

    const signer1BalanceBeforePickWinner = await signer1.getBalance()
    const signer2BalanceBeforePickWinner = await signer2.getBalance()

    await factoryManager.pickWinner()

    const signer1BalanceAfterPickWinner = await signer1.getBalance()
    const signer2BalanceAfterPickWinner = await signer2.getBalance()

    const totalValue = value1.add(value2)

    if (signer1BalanceBeforePickWinner.toBigInt() === signer1BalanceAfterPickWinner.toBigInt()) {
      expect(signer2BalanceAfterPickWinner.toBigInt()).to.equal(signer2BalanceBeforePickWinner.add(totalValue).toBigInt())
    } else {
      expect(signer1BalanceAfterPickWinner.toBigInt()).to.equal(signer1BalanceBeforePickWinner.add(totalValue).toBigInt())
    }
  })
})
