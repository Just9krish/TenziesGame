import './App.css'
import { useState } from 'react';
import Dice from './components/Dice'
import { nanoid } from 'nanoid'

function App() {

  let [dice, setDice] = useState(allNewDice())

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function reRoll() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld === true ?
        die :
        generateNewDie()
    }))
  }

  function holdDice(diceId) {
    setDice(oldDice => oldDice.map(die => {
      return diceId === die.id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }
  // console.log(dice)

  const DiceElements = dice.map(die => {
    return <Dice
      value={die.value}
      key={die.id}
      // id={die.id} then holdDice={holdDice} would do thing
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}   // this is another way of passing parameter to function
    />
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
