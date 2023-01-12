import React, { HTMLProps, useState } from 'react'

export const useNumberInput = (
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
        if (!Number.isNaN(parsed)) {
          setNumberValue(parsed)
        }
      }}
    />
  )
  return [numberValue, component]
}
