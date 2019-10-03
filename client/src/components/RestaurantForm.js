import React, { Component } from "react";
import TimeForm from "./TimeForm";
import TableForm from "./TableForm";
import axios from "axios";

export default class RestaurantForm extends Component {
  state = {
    name: "",
    address: "",
    phone: "",
    email: "",
    weekdays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    tablenumber: 0,
    tables: [],
    openingtimes: {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {}
    }
  };

  // getData = () => {
  //   const id = this.props.match.params.id;
  //   axios
  //     .get(`/api/restaurants/${id}`)
  //     .then(response => {
  //       this.setState({
  //          name: response.data.name,
  //          address: response.data.address,
  //          phone: response.data.phone,
  //          email: response.data.email,
  //          weekdays: response.data.weekdays,
  //          tablenumber: response.data.tablenumber,
  //          tables: response.data.tables,
  //          openingtimes: response.data.openingtimes,
  //         //  owner: response.data._id
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err.response);
  //       if (err.response.status === 404) {
  //         this.setState({ error: "Not found" });
  //       }
  //     });
  // };

  // componentDidMount = () => {
  //   this.getData();
  // };

  // get values from text-inputs and update state with them
  handleChange = event => {
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value
      },
      () => {
        if (name === "tablenumber" && this.state.tablenumber) {
          this.initializedTable(this.state.tablenumber);
        }
      }
    );
    this.setOpeningTime(name, value);
  };

  setOpeningTime = (name, value, weekday) => {
    //valute that we get from time form is a string and we need it as a number in DB
    let valueInt = Number(value.replace(":", ""));
    this.setState(
      {
        openingtimes: {
          ...this.state.openingtimes,
          [weekday]: {
            ...this.state.openingtimes[weekday],
            [name]: valueInt
          }
        }
      },
      () => console.log("updated state", this.state)
    );
  };
  //get values from checkboxes and update states of weekdays with them
  handleCheckboxChange = event => {
    const { weekdays } = { ...this.state };
    const currentState = weekdays;

    const name = event.target.name;
    const check = event.target.checked;
    currentState[name] = check;

    this.setState({ weekdays: currentState });
  };

  //create array of tables based on table number with default empty states for cap and num
  initializedTable = tableNumber => {
    let newTableState = [...Array(Number(tableNumber))].map(table => ({
      cap: 0,
      num: ""
    }));
    this.setState({ tables: newTableState });
  };

  //update array of tables with cap and num according to their indexes. Update state with tables with correct state.
  tablesStage2B = (cap, num, index) => {
    let totalTables = this.state.tables.map((table, i) => {
      if (index === i) {
        return {
          cap,
          num
        };
      } else return table;
    });

    this.setState(
      {
        tables: totalTables
      },
      () => {}
    );
  };

  //POST results of form to create / update restaurant document
  handleSubmit = (event, str) => {
    event.preventDefault();

    const {
      name,
      address,
      phone,
      email,
      weekdays,
      tablenumber,
      tables,
      openingtimes
    } = this.state;
    console.log(weekdays);
    axios
      .post("/api/restaurants", {
        name,
        address,
        phone,
        email,
        weekdays,
        tablenumber,
        tables,
        openingtimes
      })
      .then(data => {
        //check how to build getDate function based on ProjectDetails.js in w8d2
        // this.props.getData();
        // this.props.hideForm();
        // console.log(data);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // handleSubmit = event => {
  //   event.preventDefault();

  //   const { title, description } = this.state;

  //   axios
  //     .post("/api/tasks", {
  //       title,
  //       description,
  //       projectId: this.props.projectId
  //     })
  //     .then(() => {
  //       this.props.getData();
  //       this.props.hideForm();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <h3>General information: </h3>
          <div>
            <label htmlFor="name">Restaurant name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <label htmlFor="address">Address: </label>
            <input
              type="text"
              name="address"
              id="address"
              value={this.state.address}
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
          <h3>Opening times: </h3>
          <div>
            <div>
              <p>Monday</p>
              <label htmlFor="monday">Open? </label>
              <input
                type="checkbox"
                name="monday"
                id="monday"
                checked={this.state.weekdays.monday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.monday && (
                <TimeForm
                  setOpeningTime={this.setOpeningTime}
                  weekday={"monday"}
                />
              )}
            </div>
            <div>
              <p>Tuesday</p>
              <label htmlFor="tuesday">Open? </label>
              <input
                type="checkbox"
                name="tuesday"
                id="tuesday"
                checked={this.state.weekdays.tuesday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.tuesday && (
                <TimeForm
                  setOpeningTime={this.setOpeningTime}
                  weekday={"tuesday"}
                />
              )}
            </div>
            <div>
              <p>Wednesday</p>
              <label htmlFor="wednesday">Open? </label>
              <input
                type="checkbox"
                name="wednesday"
                id="wednesday"
                checked={this.state.weekdays.wednesday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.wednesday && (
                <TimeForm
                  setOpeningTime={this.setOpeningTime}
                  weekday={"wednesday"}
                />
              )}
            </div>
            <div>
              <p>Thursday</p>
              <label htmlFor="thursday">Open? </label>
              <input
                type="checkbox"
                name="thursday"
                id="thursday"
                checked={this.state.weekdays.thursday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.thursday && (
                <TimeForm
                  setOpeningTime={this.setOpeningTime}
                  weekday={"thursday"}
                />
              )}
            </div>
            <div>
              <p>Friday</p>
              <label htmlFor="friday">Open? </label>
              <input
                type="checkbox"
                name="friday"
                id="friday"
                checked={this.state.weekdays.friday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.friday && (
                <TimeForm
                  setOpeningTime={this.setOpeningTime}
                  weekday={"friday"}
                />
              )}
            </div>
            <div>
              <p>Saturday</p>
              <label htmlFor="saturday">Open? </label>
              <input
                type="checkbox"
                name="saturday"
                id="saturday"
                checked={this.state.weekdays.saturday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.saturday && (
                <TimeForm
                  setOpeningTime={this.setOpeningTime}
                  weekday={"saturday"}
                />
              )}
            </div>
            <div>
              <p>Sunday</p>
              <label htmlFor="sunday">Open? </label>
              <input
                type="checkbox"
                name="sunday"
                id="sunday"
                checked={this.state.weekdays.sunday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.sunday && (
                <TimeForm
                  setOpeningTime={this.setOpeningTime}
                  weekday={"sunday"}
                />
              )}
            </div>
          </div>

          <h3>Seating information: </h3>
          <label htmlFor="tablenumber">Number of tables: </label>
          <input
            type="number"
            name="tablenumber"
            id="tablenumber"
            value={this.state.tablenumber}
            onChange={this.handleChange}
            min="0"
          />
          {/* render TableForm with amount of TableRows equal to number of tables */}
          <TableForm
            tableAmount={this.state.tablenumber}
            tablesStage2A={this.tablesStage2B}
          />
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

// let dayArray = [{"name": "monday"},{"name": "tuesday"},{"name": "wednesday"},{"name": "thursday"},{"name": "friday"},{"name": "saturday"},{"name": "sunday"}]

// const week = dayArray.map(day => {
//    console.log(week);
//   return (

//     <div>
//     <p>{day.name}</p>
//     <label htmlFor={day.name}>Open? </label>
//     <input
//       type="checkbox"
//       name={day.name}
//       id={day.name}
//       checked={`this.state.weekdays.${day.name}`}
//       onChange={this.handleCheckboxChange}
//     />
//     {`this.state.weekdays.${day.name}` && <TimeForm  weekday={`this.state.weekdays.${day.name}`}/>}
//   </div>
//   );
// });
