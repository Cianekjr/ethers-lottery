import { Switch, Case } from 'react-if'
import { SWrapper, SAnimatedSvg, SParagraph, SActionButton } from './UserInterface.styled'
import ethereumLogo from '../../assets/ethereum.svg'
import { useStoreActions, useStoreState } from '../../store'

export const UserInterface = () => {
  const user = useStoreState((state) => state.user)

  const getInitialUserData = useStoreActions((actions) => actions.getInitialUserData)

  return (
    <SWrapper>
      <Switch>
        <Case condition={user.status === 'NOT_METAMASK'}>
          <SParagraph>Please consider installing MetaMask.</SParagraph>
        </Case>
        <Case condition={user.status === 'NOT_CONNECTED'}>
          <SAnimatedSvg src={ethereumLogo} alt="logo" />
          <SParagraph>In order to play please connect your MetaMask wallet.</SParagraph>
          <SActionButton onClick={() => getInitialUserData()}>Connect Wallet</SActionButton>
        </Case>
        <Case condition={user.status === 'ERROR'}>
          <SActionButton onClick={() => getInitialUserData()}>Connect Wallet</SActionButton>
        </Case>
      </Switch>
    </SWrapper>
  )
}
