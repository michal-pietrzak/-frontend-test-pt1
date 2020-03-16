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

export class Calculator extends React.Component {
  
  initState = {
    value: null,
    display: '0',
    currOperation: null,
    awaitOperand: false,
    fullCurrentOp: '',
    history: []
  }

  state = this.initState;
  
  inputNumber(num) {
    const { display, awaitOperand } = this.state
    
    if (awaitOperand) {
      this.setState({
        display: String(num),
        awaitOperand: false
      })
    } else {
      this.setState({
        display: display === '0' ? String(num) : display + num
      })
    }
  }

  calculate(nextOperation) {
    const { value, display, currOperation } = this.state;
    const inputValue = parseFloat(display);

    if (value === null) {
      this.setState({
        value: inputValue,
      })
    } else if (currOperation) {
      const currentValue = value || 0;
      const newValue = CalculateOperations[currOperation](currentValue, inputValue);
      this.setState({
        value: newValue,
        display: String(newValue)
      })
    };
    this.setState({
      awaitOperand: true,
      currOperation: nextOperation
    })
  }

  clearAll() {
    this.setState(this.initState);
  }

  handleKeyboardInput(e) {
    let { key } = e;

    if (key === 'Enter') key = '=';

    if ((/\d/).test(key)) {
      e.preventDefault();
      this.inputNumber(parseInt(key, 10))
    } else if (key in CalculateOperations) {
      e.preventDefault();
      this.calculate(key);
    } else if (key === 'c' || key === 'C') {
      if (this.state.display !== '0') {
        this.clearAll();
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyboardInput)
  }


  render() {
    return (
    
    <div className="calculator">
      <div>
        <div className="brand">Pocket calculator</div>
        <Display value={this.state.display} />
      </div>
      <div>
        <div className="keypad">
          <div className="keypad__row">
            <CalcKey className="keypad__row--key" key="calc-7" keyvalue={7} onClick={() => this.inputNumber(7)} />
            <CalcKey className="keypad__row--key" key="calc-8" keyvalue={8} onClick={() => this.inputNumber(8)} />
            <CalcKey className="keypad__row--key" key="calc-9" keyvalue={9} onClick={() => this.inputNumber(9)} />
            <CalcKey className="keypad__row--key operation-key operation-key--plus" key="calc-plus" onClick={() => this.calculate('+')} keyvalue='' />
          </div>
          <div className="keypad__row">
            <CalcKey className="keypad__row--key" key="calc-4" keyvalue={4} onClick={() => this.inputNumber(4)} />
            <CalcKey className="keypad__row--key" key="calc-5" keyvalue={5} onClick={() => this.inputNumber(5)} />
            <CalcKey className="keypad__row--key" key="calc-6" keyvalue={6} onClick={() => this.inputNumber(6)} />
            <CalcKey className="keypad__row--key operation-key operation-key--minus" key="calc-minus" onClick={() => this.calculate('-')} keyvalue='' />
          </div>
          <div className="keypad__row">
            <CalcKey className="keypad__row--key" key="calc-1" keyvalue={1} onClick={() => this.inputNumber(1)} />
            <CalcKey className="keypad__row--key" key="calc-2" keyvalue={2} onClick={() => this.inputNumber(2)} />
            <CalcKey className="keypad__row--key" key="calc-3" keyvalue={3} onClick={() => this.inputNumber(3)} />
            <CalcKey className="keypad__row--key operation-key operation-key--multiply" key="calc-times" onClick={() => this.calculate('*')} keyvalue='' />
          </div>
          <div className="keypad__row">
            <CalcKey className="keypad__row--key" key="calc-clear" keyvalue='C' onClick={() => this.clearAll()}/>
            <CalcKey className="keypad__row--key" key="calc-0" keyvalue={0} onClick={() => this.inputNumber(0)}/>
            <CalcKey className="keypad__row--key operation-key operation-key--equals" key="calc-equals" onClick={() => this.calculate('=')} keyvalue='' />
            <CalcKey className="keypad__row--key operation-key operation-key--divide" key="calc-divide" onClick={() => this.calculate('/')} keyvalue='' />
          </div>
        </div>
      </div>
    </div>
  )}
}

