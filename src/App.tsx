import React, { useMemo, useState } from 'react'
import './App.css'
import { CoinSide } from './Coin/Coin'
import { useNumberInput } from './UseNumberInput'
import { Bar, Pie } from 'react-chartjs-2'
import { ChartData } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const initialCounts: Record<CoinSide, number> = {
  [CoinSide.Tails]: 0,
  [CoinSide.Heads]: 0,
}

const roundToDigit = (n: number, digits: number) => {
  const asdf = 10 ** digits
  return Math.round(n * asdf) / asdf
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

  const absoluteData = useMemo((): ChartData<'bar', number[], string> => {
    return {
      labels: ['Kopf', 'Zahl'],
      datasets: [
        {
          data: [counts[CoinSide.Heads], counts[CoinSide.Tails]],
          label: 'Münzwurf',
        },
      ],
    }
  }, [counts])

  const totalCount = Math.max(
    1,
    counts[CoinSide.Heads] + counts[CoinSide.Tails],
  )
  const relativeData = useMemo((): ChartData<'pie', number[], string> => {
    return {
      labels: ['Kopf', 'Zahl'],
      datasets: [
        {
          data: [
            roundToDigit(counts[CoinSide.Heads] / totalCount, 3),
            roundToDigit(counts[CoinSide.Tails] / totalCount, 3),
          ],
          label: 'Münzwurf',
        },
      ],
    }
  }, [counts, totalCount])

  return (
    <div className={'card'}>
      {/*<div className="coin-wrapper">*/}
      {/*  <Coin side={CoinSide.Heads} spinning={forceFair} />*/}
      {/*  <Coin side={CoinSide.Tails} spinning={forceFair} />*/}
      {/*</div>*/}
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
      <div className="data">
        <Bar
          data={absoluteData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          plugins={[ChartDataLabels]}
        />
        <Pie data={relativeData} plugins={[ChartDataLabels]} />
      </div>
    </div>
  )
}

export default App
