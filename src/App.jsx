import './App.css'
import Dice from './components/Dice'
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzie, setTenzie] = useState(false)     // this will tell user if he won the game of not

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

    tenzie ? setDice(allNewDice()) :
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld === true ?
          die :
          generateNewDie()
      }))

    if (tenzie === true) setTenzie(false)
  }

  // function reRoll() {
  //   if (!tenzie) {
  //     setDice(oldDice => oldDice.map(die => {
  //       return die.isHeld ?
  //         die :
  //         generateNewDie()
  //     }))
  //   } else {
  //     setTenzie(false)
  //     setDice(allNewDice())
  //   }
  // }

  function holdDice(diceId) {
    setDice(oldDice => oldDice.map(die => {
      return diceId === die.id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }
  // console.log(dice)

  useEffect(() => {

    const allSameValue = () => {
      for (let i = 0; i < dice.length; i++) {
        if (dice[i].value !== dice[0].value) {
          return false;
        }
      }
      return true
    }

    const allHeld = () => {
      for (let i = 0; i < dice.length; i++) {
        if (dice[i].isHeld !== dice[0].isHeld) {
          return false;
        }
      }
      return true;
    }

    // if (allSameValue() && allHeld()) console.log('Won');

    // This is imperative way of doing it but javascript provide some
    // usefull method like every method which take func as para and return true,
    // if function call on each item return true
    // and return fasle if one element return false

    // const firstValue = dice[0].value
    // const allSameValue = dice.every(die => die.value === firstValue)
    // const allHeld = dice.every(die => die.isHeld)

    // console.log(allSameValue())
    if (allSameValue() && allHeld()) {
      setTenzie(true)
    }

  }, [dice]);


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
      {tenzie && <Confetti />}
      <div className='header'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='dice--container'>
        {DiceElements}
      </div>
      <button onClick={reRoll} className='btn'>{tenzie ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
