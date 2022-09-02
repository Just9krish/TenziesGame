import './App.css'
import { useState } from 'react';
import Dice from './components/Dice'

function App() {

  let [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6))
    }

    return newDice
  }

  function reRoll() {
    setDice( allNewDice())
  }

  const DiceElements = dice.map(die => {
    return <Dice value={die} />
  })


  return (
    <main className="app">
      <div className='header'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='dice--container'>
        {DiceElements}
      </div>
      <button onClick={reRoll} className='btn'>Roll</button>
    </main>
  )
}

export default App
