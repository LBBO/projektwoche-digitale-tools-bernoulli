import React, { useState } from 'react'
import { createStyles, InputProps, OutlinedInput } from '@mui/material'

export const useNumberInput = (
  defaultValue: number,
  inputProps: InputProps = {},
) => {
  const [numberValue, setNumberValue] = useState(defaultValue)
  const [value, setValue] = useState(numberValue.toString())
  const component = (
    <OutlinedInput
      {...inputProps}
      type={'number'}
      size={'small'}
      value={value}
      style={createStyles({
        marginRight: '0.5em',
      })}
      onChange={(e) => {
        setValue(e.target.value)
        const parsed = parseFloat(e.target.value)
        if (!Number.isNaN(parsed)) {
          setNumberValue(parsed)
        }
      }}
    />
  )
  return [numberValue, component] as const
}
