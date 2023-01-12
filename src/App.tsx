import React, { HTMLProps, useState } from 'react'
import './App.css'
import { CoinSide } from './Coin/Coin'

const useNumberInput = (
  defaultValue: number,
  inputProps: HTMLProps<HTMLInputElement> = {},
) => {
  const [numberValue, setNumberValue] = useState(defaultValue)
  const [value, setValue] = useState(numberValue.toString())
  const component = (
    <input
      {...inputProps}
      type={'number'}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        const parsed = parseFloat(e.target.value)
        console.log(e.target.value, parsed)
        if (!Number.isNaN(parsed)) {
          setNumberValue(parsed)
        }
      }}
    />
  )
  return [numberValue, component]
}

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
