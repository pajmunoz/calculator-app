import React, { Component } from "react";
import "./Main.css";
//import * as Calculator from "arithmetic-expression-calculator/src/Calculator";

class Main extends Component {
  constructor(props, prevState) {
    super(props);
    this.state = { operation: [null], res: [false], result: [null] };
    this.handleClick = this.handleClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  data = [
    { id: 0, val: 7, keycode: 55 },
    { id: 1, val: 8, keycode: 56 },
    { id: 2, val: 9, keycode: 57 },
    { id: 3, val: " / ", keycode: 191 },
    { id: 4, val: 4, keycode: 52 },
    { id: 5, val: 5, keycode: 53 },
    { id: 6, val: 6, keycode: 54 },
    { id: 7, val: " * ", keycode: 106 },
    { id: 8, val: 1, keycode: 49 },
    { id: 9, val: 2, keycode: 50 },
    { id: 10, val: 3, keycode: 51 },
    { id: 11, val: " - ", keycode: 109 },
    { id: 12, val: "00", keycode: 48 },
    { id: 13, val: 0, keycode: 48 },
    { id: 14, val: ".", keycode: 190 },
    { id: 15, val: " + ", keycode: 107 },
  ];

  handleSubmit = (e) => {
    e.preventDefault();
    //this.handleClean(e);

    const Calculator = require("arithmetic-expression-calculator/src/Calculator");
    const expression = String(this.state.operation.join(""));
    const rpnCalculator = new Calculator();
    const rpnExpression = rpnCalculator.convertToRPN(expression);
    const calcResult = rpnCalculator.calculateRPNExpression(rpnExpression);

    this.setState((prevState) => ({
      operation: [...prevState.operation],
      res: [true],
      result: calcResult,
    }));
    //console.log(expression);
  };

  handleClean = (e) => {
    //e.preventDefault();
    this.setState({ operation: [], result: [] });
  };

  handleClick = (e) => {
    e.preventDefault();
    const formatedValue = String(e.target.value);

    this.setState((prevState) => ({
      operation:
        this.state.result.length >= 0
          ? [...prevState.operation, formatedValue]
          : [formatedValue],
      res: [false],
      result: [],
    }));
  };

  handleDisplay = (e) => {
    const oper = String(this.state.operation.join(""));
    const res = this.state.result;
    const display = e === "oper" ? oper : res;
    return display;
  };

  onKeyPress = (e) => {
    e.preventDefault();
    if (!isNaN(e.key)) {
      this.setState((prevState) => ({
        operation: [...prevState.operation, e.key],
      }));
    } else if (e.which === 8) {
      this.handleClean(e);
    } else if (e.which === 13) {
      this.handleSubmit(e);
      this.setState(() => ({
        operation: [],
        res: [true],
      }));
    } else {
      if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        e.preventDefault(e);
        this.setState((prevState) => ({
          operation: [...prevState.operation, ` ${e.key} `],
        }));
        //console.log(e.key);
      }
    }

    //console.log(this.state.operation);
  };
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress, false);
  }

  render() {
    return (
      <>
        <form className="mt-5" onSubmit={this.handleSubmit}>
          <div className="row p-3 mx-auto  bg-calc">
            <div className="input-group">
              <div className="form-floating col-12">
                <input
                  type="text"
                  id="formu"
                  className="form-control"
                  onKeyPress={this.handleKey}
                  placeholder="1 + 2"
                  readOnly
                  defaultValue={this.handleDisplay("oper")}
                />
                <label htmlFor="formu">Fórmula</label>
              </div>

              <div className="form-floating col-12 mt-2">
                <input
                  type="text"
                  id="res"
                  className="form-control"
                  placeholder="Respuesta"
                  readOnly
                  defaultValue={this.handleDisplay("res")}
                />
                <label htmlFor="res">Resultado</label>
              </div>
            </div>
            {this.data.map((data) => (
              <div className="col-3" key={data.id}>
                {" "}
                <button
                  type="button"
                  onClick={this.handleClick}
                  value={data.val}
                  keycode={data.keycode}
                  className="btn btn-primary"
                >
                  {data.val} 
                </button>{" "}
              </div>
            ))}
            <div className="col-6">
              <button
                type="button"
                onClick={this.handleClean}
                className="btn btn-outline-primary"
              >
                AC <span className="badge bg-primary">⌫</span>
              </button>
            </div>
            <div className="col-6">
              <button type="submit" className="btn btn-outline-success" value="=">
                = <span className="badge bg-success">↵</span>
              </button>

            </div>
          </div>
        </form>
      </>
    );
  }
}

export default Main;
