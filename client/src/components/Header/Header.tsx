import { SHeader, SLogo, SAddress } from './Header.styled'
import { useStoreState } from '../../store'

export const Header = () => {
  const userAddress = useStoreState((state) => state.user.userAddress)

  return (
    <SHeader>
      <SLogo>Lottery Game</SLogo>
      {userAddress && <SAddress>{userAddress}</SAddress>}
    </SHeader>
  )
}
