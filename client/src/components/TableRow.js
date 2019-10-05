import React, { Component } from "react";

export default class TableRow extends Component {
  state = {
    cap: 0,
    num: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    //get state with cap, num, index for each table
    this.setState(
      {
        [name]: value
      },
      () => {
        this.props.tablesStage1A(
          this.state.cap,
          this.state.num,
          this.props.index
        );
      }
    );
  };

  componentDidMount() {
    // console.log(this.props.tableobject);
    if (this.props.tableobject) {
      this.setState(
        {
          cap: this.props.tableobject.cap,
          num: this.props.tableobject.num
        }
        // () => console.log(this.state)
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor="num">Table Id: </label>
        <input
          type="text"
          name="num"
          id="num"
          value={this.state.num}
          required
          onChange={this.handleChange}
        />

        <label htmlFor="cap">Seats how many people?</label>
        <input
          type="number"
          name="cap"
          id="cap"
          value={this.state.cap}
          onChange={this.handleChange}
          min="1"
        />
      </React.Fragment>
    );
  }
}
