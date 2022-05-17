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
        <form className="w-50 mx-auto" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onKeyPress={this.handleKey}
                placeholder={this.handleDisplay("oper")}
                //readOnly={this.handleDisplay("oper")}
                defaultValue={this.handleDisplay("oper")}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder={this.handleDisplay("res")}
                //readOnly={this.handleDisplay("res")}
                defaultValue={this.handleDisplay("res")}
              />
              <button
                type="button"
                onClick={this.handleClean}
                className="btn btn-outline-secondary"
              >
                Limpiar
              </button>
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
            <div className="col-6 mx-auto">
              <button type="submit" className="btn btn-success" value="=">
                =
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default Main;
