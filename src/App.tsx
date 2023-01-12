import React, { HTMLProps, useState } from 'react'
import './App.css'

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

function App() {
  const [forceFair, setForceFair] = useState(true)
  const [probability, probabilityInput] = useNumberInput(0.5, {
    disabled: forceFair,
  })
  const finalProbability = forceFair ? 0.5 : probability

  return (
    <div className={'card'}>
      <div className="coin"></div>
      <div className="options">
        <label>
          {probabilityInput}
          Wahrscheinlichkeit
        </label>
        <label>
          <input
            type="checkbox"
            checked={forceFair}
            onChange={() => setForceFair(!forceFair)}
          />
          Fair
        </label>
      </div>
    </div>
  )
}

export default App
