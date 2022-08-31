import './App.css'
import Dice from './components/Dice'

function App() {
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
