import React, { useState } from 'react'
import './App.css'
import { CoinSide } from './Coin/Coin'
import { useNumberInput } from './UseNumberInput'

const initialCounts: Record<CoinSide, number> = {
  [CoinSide.Tails]: 0,
  [CoinSide.Heads]: 0,
}

function App() {
  const [forceFair, setForceFair] = useState(true)
  const [probability, probabilityInput] = useNumberInput(0.5, {
    disabled: forceFair,
  })
  const finalProbability = forceFair ? 0.5 : probability
  const [counts, setCounts] = useState({ ...initialCounts })

  const spinTimesFactory = (n: number) => () => {
    const countsCopy = { ...counts }
    for (let i = 0; i < n; i++) {
      const side =
        Math.random() < finalProbability ? CoinSide.Heads : CoinSide.Tails
      countsCopy[side]++
    }
    setCounts(countsCopy)
  }

  const clearCounts = () => {
    setCounts({ ...initialCounts })
  }
  return (
    <div className={'card'}>
      {/*<div className="coin-wrapper">*/}
      {/*  <Coin side={CoinSide.Heads} spinning={forceFair} />*/}
      {/*  <Coin side={CoinSide.Tails} spinning={forceFair} />*/}
      {/*</div>*/}
      {JSON.stringify(counts)}
      <div className="options">
        <label>
          {probabilityInput}
          Wahrscheinlichkeit Kopf
        </label>
        <label>
          <input
            type="checkbox"
            checked={forceFair}
            onChange={() => setForceFair(!forceFair)}
          />
          Fair
        </label>
        <div className="buttons">
          <button onClick={spinTimesFactory(1)}>1x</button>
          <button onClick={spinTimesFactory(10)}>10x</button>
          <button onClick={spinTimesFactory(100)}>100x</button>
          <button onClick={spinTimesFactory(1000)}>1000x</button>
          <button onClick={clearCounts}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App
