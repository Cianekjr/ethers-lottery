import { action, createStore, thunk, thunkOn, ThunkOn, Action, Thunk, createTypedHooks } from 'easy-peasy'
import { ethers } from 'ethers'
import { abi as contractAbi, address as contractAddress } from '../utils/ethers'

const {
  utils: { formatEther, parseEther },
} = ethers

type IContractStatus = 'NOT_CONNECTED' | 'CONNECTED' | 'ERROR'

interface IContract {
  status?: IContractStatus;
  contract?: ethers.Contract | null;
  ticketsCount?: number | null;
  prizePool?: string | null;
  managerAddress?: string | null;
}

type IUserStatus = 'NOT_METAMASK' | 'NOT_CONNECTED' | 'CONNECTED' | 'ERROR'

interface IUser {
  status?: IUserStatus;
  userAddress?: string | null;
  provider?: ethers.providers.Web3Provider | null;
}

interface IStore {
  contract: IContract;
  setContractData: Action<IStore, Partial<IContract>>;
  user: IUser;
  setUserData: Action<IStore, Partial<IUser>>;
  errorMessage: string | null;
  setError: Action<IStore, any>;
  getInitialUserData: Thunk<IStore, void, void>;
  getInitialContractData: ThunkOn<IStore, void, IStore>;
  synchronizeUserData: Thunk<IStore>;
  synchronizeContractData: Thunk<IStore, void, IStore>;

  enterLottery: Thunk<IStore, number, IStore>;
  pickWinner: Thunk<IStore, void, IStore>;
}

export const store = createStore<IStore>({
  contract: {
    status: 'NOT_CONNECTED',
    contract: null,
    ticketsCount: null,
    prizePool: null,
    managerAddress: null,
  },
  user: {
    status: 'NOT_CONNECTED',
    userAddress: null,
    provider: null,
  },
  errorMessage: null,
  setError: action((state, error) => {
    if (error.message) {
      state.errorMessage = error.message
    }
  }),
  setContractData: action((state, newState) => {
    state.contract = { ...state.contract, ...newState }
  }),
  setUserData: action((state, newState) => {
    state.user = { ...state.user, ...newState }
  }),
  getInitialUserData: thunk(async (actions) => {
    if (!window.ethereum) {
      actions.setUserData({ status: 'NOT_METAMASK' })
    }
    try {
      // @ts-ignore // MetaMask types are incompatible with ethers
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])

      const userAddress = await provider.getSigner().getAddress()

      actions.setUserData({ provider, userAddress, status: 'CONNECTED' })
    } catch (e) {
      actions.setError(e)
      actions.setUserData({ status: 'ERROR' })
    }
  }),
  getInitialContractData: thunkOn(
    (actions) => actions.getInitialUserData,
    async (actions, _, helpers) => {
      try {
        const state = helpers.getState()
        const provider = state.user.provider

        if (!provider) {
          actions.setContractData({ status: 'NOT_CONNECTED' })
          return
        }

        const signer = provider.getSigner()

        const contract = new ethers.Contract(contractAddress, JSON.stringify(contractAbi), signer)

        actions.setContractData({ contract, status: 'CONNECTED' })
      } catch (e) {
        actions.setError(e)
        actions.setContractData({ status: 'ERROR' })
      }
      await actions.synchronizeUserData()
      await actions.synchronizeContractData()
    }
  ),
  synchronizeUserData: thunk(async (actions, _, helpers) => {
    try {
      const state = helpers.getState()
      const provider = state.user.provider

      const signer = provider?.getSigner()

      if (provider && signer) {
        const userAddress = await signer.getAddress()

        actions.setUserData({ userAddress })
      }
    } catch (e) {
      actions.setError(e)
      actions.setUserData({ status: 'ERROR' })
    }
  }),
  synchronizeContractData: thunk(async (actions, _, helpers) => {
    try {
      const state = helpers.getState()
      const provider = state.user.provider

      const contract = state.contract.contract

      if (provider && contract) {
        const prizePool = formatEther(await provider.getBalance(contract.address))
        const ticketsCount = (await contract.getTicketsCount()).toNumber()
        const managerAddress = await contract.manager()

        actions.setContractData({ prizePool, ticketsCount, managerAddress })
      }
    } catch (e) {
      actions.setError(e)
      actions.setContractData({ status: 'ERROR' })
    }
  }),
  pickWinner: thunk(async (actions, _, helpers) => {
    try {
      const state = helpers.getState()

      const contract = state.contract.contract

      if (contract) {
        await contract.pickWinner()
      }
    } catch (e) {
      actions.setError(e)
    }
  }),
  enterLottery: thunk(async (actions, ticketValue: number, helpers) => {
    try {
      const state = helpers.getState()

      const contract = state.contract.contract

      console.log('dawdawadw', contract, state)
      if (contract) {
        await contract.enter({ value: parseEther(ticketValue.toString()) })
      }
    } catch (e) {
      actions.setError(e)
    }
  }),
})

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<IStore>()
