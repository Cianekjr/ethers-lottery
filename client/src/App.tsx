import { useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import { useEther } from './hooks/useEther'

function App() {
  const { status, data, getInitialData, enterLottery, pickWinner } = useEther()

  const [ticketValue, setTicketValue] = useState(0.1)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketValue(Number(event.target.value))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Lottery Game</h2>
        {Number.isFinite(data?.ticketsCount) ? <p>Tickets count: {data?.ticketsCount}</p> : null}
        {data?.prizePool ? <p>Prize pool: {data?.prizePool} ether!</p> : null}
        {status === 'NOT_CONNECTED' && <button onClick={getInitialData}>Connect Wallet</button>}
        {status === 'CONNECTED' && (
          <div>
            <p>You are logged as {data?.signerAddress}</p>
            <button>Disconnect Wallet</button>
            <div>
              <h3>Do you want to play?</h3>
              <input type="number" onChange={handleInputChange} min="0.1" value={ticketValue} />
              <button onClick={() => enterLottery(ticketValue)}>Enter</button>
            </div>
            {data?.signerAddress === data?.managerAddress && (
              <div>
                <button onClick={pickWinner}>Pick winner</button>
              </div>
            )}
          </div>
        )}
        {status === 'NOT_METAMASK' && <p>Please install MetaMask</p>}
      </header>
    </div>
  )
}

export default App
