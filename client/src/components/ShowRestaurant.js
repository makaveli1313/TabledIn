import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import uuidv4 from "uuid/v4";

export default class ShowRestaurant extends Component {
  state = {
    name: "",
    address: "",
    phone: "",
    email: "",
    logo: "",
    menu: "",
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

  convertTime = time => {
    let t = time.toString();
    if (t.length === 3) {
      let tEnd = t.slice(t.length - 2);
      let tStart = "0" + t.substr(0, 1) + ":";
      t = tStart + tEnd;
    } else {
      let tEnd = t.slice(t.length - 2);
      let tStart = t.substr(0, 2) + ":";
      t = tStart + tEnd;
    }
    return t;
  };

  getData = () => {
    axios
      .get("/api/restaurants")
      .then(response => {
        if (response) {
          Object.keys(response.data.openingtime).forEach(key => {
            response.data.openingtime[key].opentime = this.convertTime(
              response.data.openingtime[key].opentime
            );
            response.data.openingtime[key].closetime = this.convertTime(
              response.data.openingtime[key].closetime
            );
          });

          this.setState({
            name: response.data.name,
            address: response.data.address,
            phone: response.data.phone,
            email: response.data.email,
            weekdays: response.data.weekdays,
            tablenumber: response.data.tablenumber,
            tables: response.data.tables,
            openingtimes: response.data.openingtime,
            menu: response.data.menu,
            logo: response.data.logo
          });
        }
      })
      .catch(err => {
        console.log(err);
        // handle err.response depending on err.response.status
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    const tables = this.state.tables;
    const tableItems = tables.map(table => {
      const id = uuidv4();
      return (
        <tr key={id}>
          <td>{table.num}</td>
          <td>{table.cap}</td>
        </tr>
      );
    });

    return (
      <div>
        <h2 className="rest-form-header">Information for {this.state.name}</h2>
        <div>
          <img
            className="rest-show-logo"
            src={this.state.logo}
            alt={this.state.name}
          />

          <button>
            {/* <a download={this.state.menu}>View Menu</a> */}
            <a href={this.state.menu} download="Menu" target="_blank">
              View Menu
            </a>
          </button>
        </div>

        <h3 className="rest-show-info-h3">General information</h3>
        <div className="rest-show-info-div">
          <p>
            <strong>Address: </strong>
            {this.state.address}
          </p>
          <p>
            <strong>Email: </strong>
            {this.state.email}
          </p>
          <p>
            <strong>Phone: </strong>
            {this.state.phone}
          </p>
        </div>

        <h3 className="rest-show-info-h3">Opening times</h3>
        <ul className="rest-show-info-ul">
          <li>
            <strong>Monday:</strong>
            {this.state.weekdays.monday ? <p>Open</p> : <p>Closed</p>}
          </li>
          {this.state.weekdays.monday && (
            <p>Opens: {this.state.openingtimes.monday.opentime}</p>
          )}
          {this.state.weekdays.monday && (
            <p>Closes: {this.state.openingtimes.monday.closetime}</p>
          )}

          <li>
            <strong>Tuesday</strong>
            {this.state.weekdays.tuesday ? <p>Open</p> : <p>Closed</p>}
          </li>
          {this.state.weekdays.tuesday && (
            <p>Opens: {this.state.openingtimes.tuesday.opentime}</p>
          )}
          {this.state.weekdays.tuesday && (
            <p>Closes: {this.state.openingtimes.tuesday.closetime}</p>
          )}

          <li>
            <strong>Wednesday</strong>
            {this.state.weekdays.wednesday ? <p>Open</p> : <p>Closed</p>}
          </li>
          {this.state.weekdays.wednesday && (
            <p>Opens: {this.state.openingtimes.wednesday.opentime}</p>
          )}
          {this.state.weekdays.wednesday && (
            <p>Closes: {this.state.openingtimes.wednesday.closetime}</p>
          )}

          <li>
            <strong>Thursday</strong>
            {this.state.weekdays.thursday ? <p>Open</p> : <p>Closed</p>}
          </li>
          {this.state.weekdays.thursday && (
            <p>Opens: {this.state.openingtimes.thursday.opentime}</p>
          )}
          {this.state.weekdays.thursday && (
            <p>Closes: {this.state.openingtimes.thursday.closetime}</p>
          )}

          <li>
            <strong>Friday</strong>
            {this.state.weekdays.friday ? <p>Open</p> : <p>Closed</p>}
          </li>
          {this.state.weekdays.friday && (
            <p>Opens: {this.state.openingtimes.friday.opentime}</p>
          )}
          {this.state.weekdays.friday && (
            <p>Closes: {this.state.openingtimes.friday.closetime}</p>
          )}

          <li>
            <strong>Saturday</strong>
            {this.state.weekdays.saturday ? <p>Open</p> : <p>Closed</p>}
          </li>
          {this.state.weekdays.saturday && (
            <p>Opens: {this.state.openingtimes.saturday.opentime}</p>
          )}
          {this.state.weekdays.saturday && (
            <p>Closes: {this.state.openingtimes.saturday.closetime}</p>
          )}

          <li>
            <strong>Sunday</strong>
            {this.state.weekdays.sunday ? <p>Open</p> : <p>Closed</p>}
          </li>
          {this.state.weekdays.sunday && (
            <p>Opens: {this.state.openingtimes.sunday.opentime}</p>
          )}
          {this.state.weekdays.sunday && (
            <p>Closes: {this.state.openingtimes.sunday.closetime}</p>
          )}
        </ul>

        <h3 className="rest-show-info-h3">Seating</h3>
        <p>Number of tables: {this.state.tablenumber}</p>
        <table>
          <thead>
            <tr>
              <th>Table Id</th>
              <th>Guest number</th>
            </tr>
          </thead>
          <tbody>{tableItems}</tbody>
        </table>

        <Link to="/restaurant/edit">
          <button className="edit-button">Edit Info</button>
        </Link>
      </div>
    );
  }
}
