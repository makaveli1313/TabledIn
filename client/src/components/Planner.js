import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";

export default class EditPlanner extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
      open: true,
      message: ""
    };
  }

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });

    axios
      .post("/api/planner", {
        selectedDay: this.state.selectedDay
      })
      .then(response => {
         console.log(response);
        if (response.data.message) {
          this.setState({
            message: response.data.message
          });
        } else {
          this.setState({
            open: response.data.open,
            message: ""
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  

  render() {
    return (
      <React.Fragment>
        <h3>Search for Schedules</h3>

        <div>
          {this.state.selectedDay ? (
            <p>Schedule for: {this.state.selectedDay.toDateString()}</p>
          ) : (
            <p>Please select a day.</p>
          )}
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDays={this.state.selectedDay}
          />
        </div>
        <p>{this.state.message}</p>
        <Link to="/planner/edit">
          <button>Add schedule</button>
        </Link>
        <Link to="/planner/edit">
          <button>Edit schedule</button>
        </Link>
      </React.Fragment>
    );
  }
}