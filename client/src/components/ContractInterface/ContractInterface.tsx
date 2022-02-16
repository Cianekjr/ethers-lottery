import { useState } from 'react'
import { When } from 'react-if'

import { useStoreActions, useStoreState } from '../../store'
import { SParagraph, SInputWrapper, SActionButton, SInputButton, SInput, SHeading } from './ContractInterface.styled'

export const ContractInterface = () => {
  const pickWinner = useStoreActions((actions) => actions.pickWinner)
  const enterLottery = useStoreActions((actions) => actions.enterLottery)

  const user = useStoreState((state) => state.user)
  const contract = useStoreState((state) => state.contract)

  const [ticketValue, setTicketValue] = useState(0.1)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketValue(Number(event.target.value))
  }

  return (
    <div>
      <When condition={contract.status === 'CONNECTED'}>
        {Number.isFinite(contract?.ticketsCount) ? <SParagraph>Tickets count: {contract?.ticketsCount}</SParagraph> : null}
        {contract?.prizePool ? <SParagraph>Prize pool: {contract?.prizePool} ether!</SParagraph> : null}
        <SHeading>Do you want to play?</SHeading>
        <SInputWrapper>
          <SInput type="number" onChange={handleInputChange} min="0.1" step="0.1" value={ticketValue} />
          <SInputButton onClick={() => enterLottery(ticketValue)}>Enter</SInputButton>
        </SInputWrapper>
        {user?.userAddress === contract?.managerAddress && <SActionButton onClick={() => pickWinner()}>Pick winner</SActionButton>}
      </When>
    </div>
  )
}
