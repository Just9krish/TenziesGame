import './App.css'
import Dice from './components/Dice'
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [count, setCount] = useState(0)
  const [low, setLow] = useState(0)
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


  // function reRoll() {

  //   tenzie ? setDice(allNewDice()) :
  //     setDice(oldDice => oldDice.map(die => {
  //       return die.isHeld === true ?
  //         die :
  //         generateNewDie()
  //     }))

  //   setCount(count + 1)

  //   if (tenzie === true) setTenzie(false)
  // }
 
 

  function reRoll() {
    if (!tenzie) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
      setCount(count + 1)
      setLow(low + 1)
    } else {
      setTenzie(false)
      setDice(allNewDice())
      setCount(1)
    }
  }
  console.log(count)

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
      const lowestValue = finalValue
      if(lowestValue < rollValue){
        setLow(lowestValue)
      }
    }

    const finalValue =  localStorage.setItem('lowest', low)
    const rollValue = localStorage.setItem('lowestRoll', count)


    // console.log('dllsl')


    // if (localStorage.getItem('lowestRoll') <= 1)
    //   localStorage.setItem('lowestRoll', 100)
  }, [dice]);

  const minimumRoll = localStorage.getItem('lowestRoll')


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
    <main className="">
      {tenzie === false ?
        <div className="app">

          <div className='header'>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </div>
          <div className='dice--container'>
            {DiceElements}
          </div>
          <button onClick={reRoll} className='btn'>Roll</button>
        </div> :

        <div className='app'>
          {tenzie && <Confetti />}
          <img src="https://i.postimg.cc/kXWYt7Rv/people-jumping.jpg" alt="" />
          <div className='winning--text'>
            <h1>You Won!</h1>
            <p>You roll a die {count} times to win the game.</p>
            <p>All time lowest roll is {minimumRoll}.</p>
          </div>
          <button className='btn' onClick={reRoll}>New Game</button>
        </div>
      }
    </main>
  )
}

export default App
