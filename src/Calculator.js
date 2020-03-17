import React from 'react';

import { Display } from './Display';
import { CalcKey } from './CalcKey';
import { History } from './History';

export class Calculator extends React.Component {
  
  initState = {
    expression: '0',
    result: null,
    history: [],
    waitingForOperand: true,
    showHistory: false,
  }

  state = this.initState;

  inputNumber = (num) => {
    const { expression } = this.state;
    const isOperand = /[0-9]/.test(num);
    const isNewExpression = expression === '0';
    this.setState({
      expression: isNewExpression ? String(num) : expression + num,
      waitingForOperand: isOperand ? false : true,
      result: null,
    })
  }

  calculate = () => {
    const result = eval(this.state.expression);
    const expressionToStore = this.state.expression + ' = ' + result;
    const newHistory = [...this.state.history, expressionToStore];
    const newHistoryTrimmed = newHistory.length > 5 ? newHistory.slice(1, 6) : newHistory;
    console.log(newHistoryTrimmed);
    this.setState({
      expression: '0',
      result,
      history: newHistoryTrimmed
    })
  }

  clearAll = () => {
    this.setState({
      expression: '0',
      result: null,
    });
  }

  clearHistory = () => {
    this.setState({
      history: []
    })
  }

  showHistory = () => {
    const historyPanel = document.getElementById('history-panel');
    if (!this.state.showHistory) {
      historyPanel.style.transform = 'translateY(0)';
    } else {
      historyPanel.style.transform = 'translateY(10rem)';
    }
    this.setState({
      showHistory: !this.state.showHistory
    })
  }

  handleKeyboardInput = (e) => {
    e.preventDefault();
    const { key } = e;
    const { waitingForOperand, expression } = this.state;

    const digitsRegex = /[0-9]*|/g;
    const opsRegex = /[+\-*/]*/g;
    const [passingDigits] = key.match(digitsRegex);
    const [passingOps] = key.match(opsRegex);

    if (key === 'Enter' || key === '\u003D') {
      if (!waitingForOperand) this.calculate()
    };
    if (key === 'c' || key === 'C') this.clearAll();

    if (passingDigits) {
      this.setState({
        expression: expression === '0' ? passingDigits : expression + passingDigits,
        waitingForOperand: false,
        result: null,
      })
    }
    if (passingOps && !waitingForOperand) {
      this.setState({
        expression: expression + ' ' + passingOps + ' ',
        waitingForOperand: true
      })
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyboardInput)
  }


  render() {
    return (
      <div className="container">
        <History ops={this.state.history}  />
        <div className="calculator">

          <div>
            <div className="brand">Pocket calculator</div>
            <Display expression={this.state.expression} result={this.state.result} />
          </div>

          <div className="keypad">
            <div className="keypad__row">
              <div className="keypad__row--key keypad__row--key--thin" onClick={this.clearHistory}>
                Clear History
              </div>
              <div className="keypad__row--key keypad__row--key--thin" onClick={this.showHistory}>
                {this.state.showHistory ? 'Hide' : 'Show'} History
              </div>
            </div>

            <div className="keypad__row">
              <CalcKey className="keypad__row--key" key="calc-7" keyvalue={7} onClick={() => this.inputNumber(7)} />
              <CalcKey className="keypad__row--key" key="calc-8" keyvalue={8} onClick={() => this.inputNumber(8)} />
              <CalcKey className="keypad__row--key" key="calc-9" keyvalue={9} onClick={() => this.inputNumber(9)} />
              <CalcKey className="keypad__row--key operation-key ico-plus" key="calc-plus" onClick={() => this.inputNumber(' + ')} keyvalue='' />
            </div>
            <div className="keypad__row">
              <CalcKey className="keypad__row--key" key="calc-4" keyvalue={4} onClick={() => this.inputNumber(4)} />
              <CalcKey className="keypad__row--key" key="calc-5" keyvalue={5} onClick={() => this.inputNumber(5)} />
              <CalcKey className="keypad__row--key" key="calc-6" keyvalue={6} onClick={() => this.inputNumber(6)} />
              <CalcKey className="keypad__row--key operation-key ico-minus" key="calc-minus" onClick={() => this.inputNumber(' - ')} keyvalue='' />
            </div>
            <div className="keypad__row">
              <CalcKey className="keypad__row--key" key="calc-1" keyvalue={1} onClick={() => this.inputNumber(1)} />
              <CalcKey className="keypad__row--key" key="calc-2" keyvalue={2} onClick={() => this.inputNumber(2)} />
              <CalcKey className="keypad__row--key" key="calc-3" keyvalue={3} onClick={() => this.inputNumber(3)} />
              <CalcKey className="keypad__row--key operation-key ico-multiply" key="calc-times" onClick={() => this.inputNumber(' * ')} keyvalue='' />
            </div>
            <div className="keypad__row">
              <CalcKey className="keypad__row--key" key="calc-clear" keyvalue='C' onClick={() => this.clearAll()}/>
              <CalcKey className="keypad__row--key" key="calc-0" keyvalue={0} onClick={() => this.inputNumber(0)}/>
              <CalcKey className="keypad__row--key operation-key ico-equals" key="calc-equals" onClick={() => !this.state.waitingForOperand ? this.calculate() : () => {}} keyvalue='' />
              <CalcKey className="keypad__row--key operation-key ico-divide" key="calc-divide" onClick={() => this.inputNumber(' / ')} keyvalue='' />
            </div>

          </div>
        </div>
      </div>
    )
  }
}

