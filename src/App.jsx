import { useState } from "react";
import "./App.css";
import Die from "./component/Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function genarateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(genarateDie());
    }

    return array;
  }

  function holdDice(id) {
    setDice((olddie) =>
      olddie.map((die) => (die.id === id ? { ...die, isHeld: true } : die))
    );
  }

  function rollDice() {
    setDice((oldState) =>
      oldState.map((die) => (die.isHeld == true ? die : genarateDie()))
    );
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
        Roll
      </button>
    </main>
  );
}

export default App;
