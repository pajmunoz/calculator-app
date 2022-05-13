import React, { Component } from "react";
import "./Main.css";
//import * as Calculator from "arithmetic-expression-calculator/src/Calculator";

class Main extends Component {
  constructor(props, prevState) {
    super(props);
    this.state = { operation: [null], res: [false], result: [null] };
    this.handleClick = this.handleClick.bind(this);
  }

  data = [
    { id: 0, val: 7 },
    { id: 1, val: 8 },
    { id: 2, val: 9 },
    { id: 3, val: " / " },
    { id: 4, val: 4 },
    { id: 5, val: 5 },
    { id: 6, val: 6 },
    { id: 7, val: " * " },
    { id: 8, val: 1 },
    { id: 9, val: 2 },
    { id: 10, val: 3 },
    { id: 11, val: " - " },
    { id: 12, val: "-/+" },
    { id: 13, val: 0 },
    { id: 14, val: "." },
    { id: 15, val: " + " },
  ];

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleClean(e);

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
    return;
  };

  handleClean = (e) => {
    e.preventDefault();
    this.setState({ operation: [], result: [] });
  };

  handleClick = (e) => {
    e.preventDefault();

    const formatedValue = String(e.target.value);

    this.setState((prevState) => ({
      operation: [...prevState.operation, formatedValue],
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
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder={this.handleDisplay("oper")}
                disabled
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder={this.handleDisplay("res")}
                disabled
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
                  className="btn btn-primary"
                >
                  {data.val}
                </button>{" "}
              </div>
            ))}
            <div className="col-12">
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
