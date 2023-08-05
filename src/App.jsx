
import { useState } from 'react'
import './App.css'
import Die from './component/Die'

function App() {

  const  [die,setDie] = useState(allNewDice())

  function allNewDice() {
    const array = []
    for(let i = 0 ; i < 10; i++) {
      array.push({
        value:Math.ceil(Math.random()*6),
        isHeld: false
      })
    }

    return array
  }

  function rollDice() {
    setDie(allNewDice())
    console.log(die)
  }

  const  dieElements = die.map(num => <Die value={num.value}/>)
  return (
    <main>
      <div className="dice-container">
          {dieElements}
      </div>
      <button onClick={rollDice} className='roll-dice'>RollDie</button>
    </main>
    
  )
}

export default App
