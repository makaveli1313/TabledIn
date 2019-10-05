import React, { Component } from "react";

export default class EditPlanner extends Component {
  state = {
    open: false,
    opentime: "",
    closetime: ""
  };

  //get values from text inputs and update state of weekday, opentime, closetime

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  //get values from checkbox and update state of "open"
  handleCheckboxChange = event => {
    const check = event.target.checked;
    
    this.setState({ open: check });
  };

  //Function to be called when submitting the form
  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <h3>Create new schedule</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="weekday">Weekday</label>
            <input
              type="text"
              name="weekday"
              id="weekday"
              required
              value={this.state.weekday}
              onChange={this.handleChange}
            />

            <label htmlFor="open">Open? </label>
            <input
              type="checkbox"
              name="open"
              id="open"
              checked={this.state.open}
              onChange={this.handleCheckboxChange}
            />
          </div>

          {this.state.open && (
            <div>
              <label htmlFor="opentime">Opening time: </label>
              <input
                type="time"
                name="opentime"
                id="opentime"
                min="08:00"
                max="23:30"
                step="900"
                required
                value={this.state.opentime}
                onChange={this.handleChange}
              />
              <label htmlFor="closetime">Closing time: </label>
              <input
                type="time"
                name="closetime"
                id="closetime"
                min="08:00"
                max="23:30"
                step="900"
                required
                value={this.state.closetime}
                onChange={this.handleChange}
              />
            </div>
          )}

          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}