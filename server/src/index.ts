import 'dotenv/config'
import HDWalletProvider from '@truffle/hdwallet-provider'
import { ethers } from 'ethers'
import { LotteryContract } from './contracts'

if (!process.env.MNEMONIC || !process.env.RPC_URL) {
  process.exit(1)
}

const walletProvider = new HDWalletProvider(process.env.MNEMONIC, process.env.RPC_URL)

const provider = new ethers.providers.Web3Provider(walletProvider)

const deploy = async () => {
  const factory = new ethers.ContractFactory(LotteryContract.abi, LotteryContract.evm.bytecode, provider.getSigner())
  const lotteryContract = await factory.deploy()

  console.log(JSON.stringify(LotteryContract.abi))
  console.log(`Contract has been deployed at address: ${lotteryContract.address}`)

  walletProvider.engine.stop()
}

deploy()
