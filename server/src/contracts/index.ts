import path from 'path'
import fs from 'fs'
// @ts-ignore // solc library doesn't provide typescript definitions
import solc from 'solc'

const LotteryContractPath = path.resolve(__dirname, 'Lottery.sol')
const LotteryContractContent = fs.readFileSync(LotteryContractPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: LotteryContractContent,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
}

const output = JSON.parse(solc.compile(JSON.stringify(input)))
const LotteryContract = output.contracts['Lottery.sol']['Lottery']

export { LotteryContract }
