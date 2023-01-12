import React, { useState } from 'react'
import './App.css'

function App() {
  const [probability, setProbability] = useState(0.5)
  const [forceFair, setForceFair] = useState(true)
  const finalProbability = forceFair ? 0.5 : probability

  return (
    <div className={'card'}>
      test
      <label>
        <input
          type="checkbox"
          checked={forceFair}
          onChange={() => setForceFair(!forceFair)}
        />
        Fair
      </label>
    </div>
  )
}

export default App
