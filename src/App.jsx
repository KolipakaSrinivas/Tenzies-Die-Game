import { useState,useEffect } from "react";
import "./App.css";
import Die from "./component/Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies,setTenzies] =useState(false)


  useEffect(()=>{
   const isheld = dice.every(die=>die.isHeld)
   const firstValue = dice[0].value

   if(isheld && firstValue) {
     setTenzies(true)
    console.log("you win!")
   }

  },[dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(generateNewDie());
    }

    return array;
  }

  function holdDice(id) {
    setDice((olddie) =>
      olddie.map((die) => (die.id === id ? { ...die, isHeld: true } : die))
    );
  }

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
  } else {
      setTenzies(false)
      setDice(allNewDice())
  }
  }

  const dieElements = dice.map((num) => (
    <Die
      key={num.id}
      isHeld={num.isHeld}
      value={num.value}
      holdDice={() => holdDice(num.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{dieElements}</div>
      <button onClick={rollDice} className="roll-dice">
        {tenzies == true ? 'New Game' : 'Roll'}
      </button>
      {tenzies&& <Confetti/>}
    </main>
  );
}

export default App;
