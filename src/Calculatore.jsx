import React, { useReducer, useState } from 'react';
import './Calculator.css';

// Reducer function
const calculatorReducer = (state, action) => {
  const { num1, num2 } = action.payload || {};
  switch (action.type) {
    case 'ADD':
      return { result: num1 + num2 };
    case 'SUBTRACT':
      return { result: num1 - num2 };
    case 'MULTIPLY':
      return { result: num1 * num2 };
    case 'DIVIDE':
      return { result: num2 !== 0 ? num1 / num2 : 'Error: /0' };
    case 'RESET':
      return { result: 0 };
    default:
      return state;
  }
};

function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, { result: 0 });
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleOperation = (type) => {
    const num1 = parseFloat(input1);
    const num2 = parseFloat(input2);
    if (!isNaN(num1) && !isNaN(num2)) {
      dispatch({ type, payload: { num1, num2 } });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setInput1('');
    setInput2('');
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h2 className="calculator-title">Simple Calculator</h2>
        <input
          type="number"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter first number"
        />
        <input
          type="number"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Enter second number"
        />

        <div className="button-group">
          <button className="btn add" onClick={() => handleOperation('ADD')}>Add</button>
          <button className="btn subtract" onClick={() => handleOperation('SUBTRACT')}>Subtract</button>
          <button className="btn multiply" onClick={() => handleOperation('MULTIPLY')}>Multiply</button>
          <button className="btn divide" onClick={() => handleOperation('DIVIDE')}>Divide</button>
          <button className="btn reset" onClick={handleReset}>Reset</button>
        </div>

        <h3 className="result">Result: {state.result}</h3>
      </div>
    </div>
  );
}

export default Calculator;
