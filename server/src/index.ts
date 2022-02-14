import 'dotenv/config'
const HDWalletProvider = require('@truffle/hdwallet-provider')
import { ethers } from 'ethers'
import { LotteryContract } from './contracts'

const walletProvider = new HDWalletProvider(process.env.MNEMONIC, 'https://rinkeby.infura.io/v3/22aa2b6fa5314abaaf18a8b552ec9c73')

const provider = new ethers.providers.Web3Provider(walletProvider)

const deploy = async () => {
  const factory = new ethers.ContractFactory(LotteryContract.abi, LotteryContract.evm.bytecode, provider.getSigner())
  const lotteryContract = await factory.deploy()

  console.log(JSON.stringify(LotteryContract.abi))
  console.log(`Contract has been deployed at address: ${lotteryContract.address}`)

  walletProvider.engine.stop()
}

deploy()
