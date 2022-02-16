import { Global } from '@emotion/react'
import { StoreProvider } from 'easy-peasy'
import { GlobalStyles, SMainApp } from './App.styled'
import { store } from './store'
import { Header } from './components/Header/Header'
import { UserInterface } from './components/UserInterface/UserInterface'
import { ContractInterface } from './components/ContractInterface/ContractInterface'
import { ErrorText } from './components/ErrorText/ErrorText'

export const App = () => (
  <StoreProvider store={store}>
    <Global styles={GlobalStyles} />
    <Header />
    <ErrorText />
    <SMainApp>
      <UserInterface />
      <ContractInterface />
    </SMainApp>
  </StoreProvider>
)
