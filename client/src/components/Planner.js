import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";

export default class EditPlanner extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.editSchedule = this.editSchedule.bind(this);
    this.state = {
      selectedDay: undefined,
      open: false,
      message: "",
      openingtime: "",
      closingtime: "",
      _id: ""
    };
  }
editSchedule() {
  
  // console.log(this.state.selectedDay)
  axios.delete("/api/planner", { data: { selectedDay : this.state.selectedDay } }).then(res =>{
    // console.log('fired' res)

  }).catch(err => {
    console.log(err);
  })
  }



  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
// console.log(this.state.selectedDay)
    axios
      .post("/api/planner", {
        selectedDay: day
      })
      .then(response => {
        console.log(response);
        if (response.data.message) {
          this.setState({
            message: response.data.message,
            open: false,
            openingtime: "",
            closingtime: "",
            _id: ""
          });
        } else {
          this.setState({
            open: response.data.open,
            openingtime: response.data.openingtime,
            closingtime: response.data.closingtime,
            _id: response.data._id,
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

        {this.state._id ? (
          <div>
            {this.state.open ? <p>Open</p> : <p>Closed</p>}
            {this.state.open && <p>Opening time: {this.state.openingtime}</p>}
            {this.state.open && <p>Closing time: {this.state.closingtime}</p>}
          </div>
        ) : (
          <p>No schedule found.</p>
        )}

        {this.state._id ? (
          <Link to="/planner/edit">
            <button onClick= {this.editSchedule}>Edit schedule</button>
          </Link>
        ) : (
          <Link to="/planner/edit">
            <button>Add schedule</button>
          </Link>
        )}
      </React.Fragment>
    );
  }
}
