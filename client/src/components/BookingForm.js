import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";

export default class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
      guestnumber: 0,
      arrivaltime: "",
      name: "",
      phone: "",
      email: "",
      message: "",
      success: ""
    };
  }

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
    console.log({
      [name]: value
    });
  };

  //Handle Submit with message functionality
  handleSubmit = event => {
    event.preventDefault();

    let success = "Created booking";

    axios
      .post("/api/bookings", {
        selectedDay: this.state.selectedDay,
        guestnumber: this.state.guestnumber,
        arrivaltime: this.state.arrivaltime,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(data => {
        if (data.message) {
          this.setState({
            message: data.message
          });
        } else {
          console.log("created booking");
          this.setState({
            success: success
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // handleSubmit = event => {
  //   event.preventDefault();

  //   axios
  //     .post("/api/bookings", {
  //       selectedDay: this.state.selectedDay,
  //       guestnumber: this.state.guestnumber,
  //       arrivaltime: this.state.arrivaltime,
  //       name: this.state.name,
  //       phone: this.state.phone,
  //       email: this.state.email
  //     })
  //     .then(() => {
  //       console.log("created booking");
  //       this.props.history.push("/");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    return (
      <React.Fragment>
        <h1>Make a booking</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>Booking Details</h3>

          <div>
            {this.state.selectedDay ? (
              <p>Date of booking: {this.state.selectedDay.toDateString()}</p>
            ) : (
              <p>Please select a day.</p>
            )}
            <DayPicker
              onDayClick={this.handleDayClick}
              selectedDays={this.state.selectedDay}
            />
          </div>

          <div>
            <label htmlFor="guestnumber">Number of guests: </label>
            <input
              type="number"
              name="guestnumber"
              id="guestnumber"
              value={this.state.guestnumber}
              onChange={this.handleChange}
              min="0"
            />
            <label htmlFor="arrivaltime">Time: </label>
            <input
              type="time"
              name="arrivaltime"
              id="arrivaltime"
              min="08:00"
              max="23:30"
              step="900"
              required
              value={this.state.arrivaltime}
              onChange={this.handleChange}
            />
          </div>

          <h3>Guest Details</h3>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="phone">Phone number: </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          {this.state.message && <p>{this.state.message}</p>}
          {this.state.success && <p>{this.state.success}</p>}
          <button type="Submit">submit</button>
        </form>
      </React.Fragment>
    );
  }
}
