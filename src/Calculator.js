import React, { useState, useEffect } from 'react';

import { Display } from './Display';
import { CalcKey } from './CalcKey';

const CalculateOperations = {
  '/': (prevVal, nextVal) => prevVal / nextVal,
  '*': (prevVal, nextVal) => prevVal * nextVal,
  '-': (prevVal, nextVal) => prevVal - nextVal,
  '+': (prevVal, nextVal) => prevVal + nextVal,
  '=': (prevVal, nextVal) => nextVal,
}

export const Calculator = () => {
  
  const initState = {
    value: null,
    display: '0',
    currOperation: null,
    awaitOperand: false,
    // history: []
  }
  
  const [state, setState] = useState(initState); 

  const inputNumber = num => {
    const { display, awaitOperand } = state
    
    if (awaitOperand) {
      setState({
        ...state,
        display: String(num),
        awaitOperand: false
      })
    } else {
      setState({
        ...state,
        display: display === '0' ? String(num) : display + num
      })
    }
  }

  const calculate = (nextOperation) => {
    const { value, display, currOperation } = state;

    const inputValue = parseFloat(display);

    if (value === null) {
      console.log(state)
      setState({
        ...state,
        value: inputValue,
      })
    } else if (currOperation) {
      const currentValue = value || 0;
      console.log(currentValue, inputValue);
      const newValue = CalculateOperations[currOperation](currentValue, inputValue);
      setState({
        ...state,
        value: newValue,
        display: String(newValue)
      })
    };
    setState({
      ...state,
      awaitOperand: true,
      currOperation: nextOperation
    })
  }

  const clearAll = () => {
    setState(initState);
  }

  const handleKeyboardInput = e => {
    let { key } = e;

    if (key === 'Enter') key = '=';

    if ((/\d/).test(key)) {
      e.preventDefault();
      inputNumber(parseInt(key, 10))
    } else if (key in CalculateOperations) {
      e.preventDefault();
      calculate(key);
    } else if (key === 'c' || key === 'C') {
      if (state.display !== '0') {
        clearAll();
      }
    }
  }

  useEffect(() => {
    return window.addEventListener('keydown', handleKeyboardInput);
  })

  return (
    
    <div className="calculator">
      <div className="brand">Pocket calculator</div>
      <Display value={state.display} />
      <div className="keypad">
        <div className="keypad__row">
          <CalcKey className="keypad__row--key" key="calc-7" keyvalue={7} onClick={() => inputNumber(7)} />
          <CalcKey className="keypad__row--key" key="calc-8" keyvalue={8} onClick={() => inputNumber(8)} />
          <CalcKey className="keypad__row--key" key="calc-9" keyvalue={9} onClick={() => inputNumber(9)} />
          <CalcKey className="keypad__row--key operation-key" key="calc-plus" onClick={() => calculate('+')} keyvalue='+' />
        </div>
        <div className="keypad__row">
          <CalcKey className="keypad__row--key" key="calc-4" keyvalue={4} onClick={() => inputNumber(4)} />
          <CalcKey className="keypad__row--key" key="calc-5" keyvalue={5} onClick={() => inputNumber(5)} />
          <CalcKey className="keypad__row--key" key="calc-6" keyvalue={6} onClick={() => inputNumber(6)} />
          <CalcKey className="keypad__row--key operation-key" key="calc-minus" onClick={() => calculate('-')} keyvalue='-' />
        </div>
        <div className="keypad__row">
          <CalcKey className="keypad__row--key" key="calc-1" keyvalue={1} onClick={() => inputNumber(1)} />
          <CalcKey className="keypad__row--key" key="calc-2" keyvalue={2} onClick={() => inputNumber(2)} />
          <CalcKey className="keypad__row--key" key="calc-3" keyvalue={3} onClick={() => inputNumber(3)} />
          <CalcKey className="keypad__row--key operation-key" key="calc-times" onClick={() => calculate('*')} keyvalue='×' />
        </div>
        <div className="keypad__row">
          <CalcKey className="keypad__row--key" key="calc-clear" keyvalue='C' onClick={clearAll}/>
          <CalcKey className="keypad__row--key" key="calc-0" keyvalue={0} onClick={() => inputNumber(0)}/>
          <CalcKey className="keypad__row--key operation-key" key="calc-equals" onClick={() => calculate('=')} keyvalue='=' />
          <CalcKey className="keypad__row--key operation-key" key="calc-divide" onClick={() => calculate('/')} keyvalue='÷' />
        </div>
      </div>
    </div>
  )
}

