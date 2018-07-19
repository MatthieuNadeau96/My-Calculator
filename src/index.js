import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Calculator extends React.Component {
  state = {
    value: null,
    displayValue: "0",
    waitingForOperand: false,
    operand: null
  }

  inputDigit (digit) {
    const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === "0" ? String(digit) : displayValue + digit
      })
    }
  }

  inputDecimal () {
    const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    }
    else if (displayValue.indexOf('.') === -1) {
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        })
      }
    }

  clearDisplay () {
    this.setState({
      displayValue: "0",
      waitingForOperand: false
    })
  }

  changeSign () {
    const { displayValue } = this.state
    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })
  }

  addPercentage () {
    const { displayValue } = this.state
    const value = parseFloat(displayValue)

    this.setState({
      displayValue: String(value / 100)
    })
  }

  performOperation (operator) {
    const { displayValue, operand, value } = this.state

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '=': (prevValue, nextValue) => nextValue
    }

    // const prevValue =
    const nextValue = parseFloat(displayValue)

    if (value == null) {
      this.setState({
        value: nextValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const computedValue = operations[operand](currentValue, nextValue)

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })

    }
    this.setState({
      waitingForOperand: true,
      operand: operator
    })
  }


  render () {
    const { displayValue } = this.state

    return (
      <div className="calculator">
        <div className="calculator-display">{displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="calculator-key key-clear" onClick={() => this.clearDisplay()}>AC</button>
              <button className="calculator-key key-sign" onClick={() => this.changeSign()}>±</button>
              <button className="calculator-key key-percent" onClick={() => this.addPercentage()}>%</button>
            </div>
            <div className="digit-keys">
              <button className="calculator-key key-0" onClick={() => this.inputDigit(0)}>0</button>
              <button className="calculator-key key-decimal" onClick={() => this.inputDecimal(".")}>.</button>
              <button className="calculator-key key-1" onClick={() => this.inputDigit(1)}>1</button>
              <button className="calculator-key key-2" onClick={() => this.inputDigit(2)}>2</button>
              <button className="calculator-key key-3" onClick={() => this.inputDigit(3)}>3</button>
              <button className="calculator-key key-4" onClick={() => this.inputDigit(4)}>4</button>
              <button className="calculator-key key-5" onClick={() => this.inputDigit(5)}>5</button>
              <button className="calculator-key key-6" onClick={() => this.inputDigit(6)}>6</button>
              <button className="calculator-key key-7" onClick={() => this.inputDigit(7)}>7</button>
              <button className="calculator-key key-8" onClick={() => this.inputDigit(8)}>8</button>
              <button className="calculator-key key-9" onClick={() => this.inputDigit(9)}>9</button>
            </div>
          </div>
          <div className="operation-keys">
            <button className="calculator-key key-divide" onClick={() => this.performOperation('/')}>÷</button>
            <button className="calculator-key key-mulitply" onClick={() => this.performOperation('*')}>×</button>
            <button className="calculator-key key-subtract" onClick={() => this.performOperation('-')}>_</button>
            <button className="calculator-key key-add" onClick={() => this.performOperation('+')}>+</button>
            <button className="calculator-key key-equals" onClick={() => this.performOperation('=')}>=</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <div id="wrapper">
    <Calculator />
  </div>,
  document.getElementById('app'));
registerServiceWorker();
