import { useState, useEffect, useCallback } from 'react';

import { ethers } from 'ethers';
import { abi as contractAbi, address as contractAddress } from '../utils/ethers'

const { utils: { formatEther, parseEther } } = ethers;

type Status = 'NOT_METAMASK' | 'NOT_CONNECTED' | 'CONNECTED'

interface IData {
  signerAddress?: string
  ticketsCount?: number
  prizePool?: string
  managerAddress?: string
}

export const useEther = () => {
  const [status, setStatus] = useState<Status>('NOT_CONNECTED')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>()
  const [contract, setContract] = useState<ethers.Contract>()
  const [data, setData] = useState<IData>()

  const getInitialData = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        provider.on("network", (_, oldNetwork) => {
          if (oldNetwork) {
            window.location.reload();
          }
        });
        setProvider(provider)
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner()
        setSigner(signer)

        const contract = new ethers.Contract(contractAddress, JSON.stringify(contractAbi), signer)
        setContract(contract)

        setStatus('CONNECTED')

        const signerAddress = await signer.getAddress()
        const prizePool = formatEther(await provider.getBalance(contract.address))
        const ticketsCount = (await contract.getTicketsCount()).toNumber()
        const managerAddress = await contract.manager()

        setData({ signerAddress, prizePool, ticketsCount, managerAddress })
      } catch (e) {
        console.error(e)
        setStatus('NOT_CONNECTED')
      }
    } else {
      setStatus('NOT_METAMASK')
    }
  }, [])

  useEffect(() => {
    getInitialData()
  }, [getInitialData])

  const enterLottery = useCallback(
    async (ticketValue: number) => {
      if (provider && signer && contract) {
        await contract.enter({ value: parseEther(ticketValue.toString()) })
      }
    }, []
  )

const pickWinner = useCallback(
  async () => {
    if (provider && signer && contract) {
      const x = await contract.pickWinner()
    }
  }, []
)

  return {
    status,
    getInitialData,
    data,
    enterLottery,
    pickWinner
  }
}