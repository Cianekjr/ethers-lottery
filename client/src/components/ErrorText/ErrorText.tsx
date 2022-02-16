import { SErrorMessage } from './ErrorText.styled'
import { useStoreState } from '../../store'

export const ErrorText = () => {
  const errorMessage = useStoreState((state) => state.errorMessage)

  return errorMessage ? <SErrorMessage>{errorMessage}</SErrorMessage> : null
}
