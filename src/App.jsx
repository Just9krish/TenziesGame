import './App.css'
import Dice from './components/Dice'

function App() {

  function allDice() {
    const allNewDice = [];

    for (let i = 0; i < 10; i++) {
      allNewDice.push(Math.ceil(Math.random() * 6))
    }

    return allNewDice
  }

  console.log(allDice())

  return (
    <main className="app">
      <div className='header'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='dice--container'>
        <Dice value={1} />
        <Dice value={2} />
        <Dice value={3} />
        <Dice value={4} />
        <Dice value={5} />
        <Dice value={6} />
        <Dice value={1} />
        <Dice value={5} />
        <Dice value={4} />
        <Dice value={2} />
      </div>
      <button className='btn'>Roll</button>
    </main>
  )
}

export default App
