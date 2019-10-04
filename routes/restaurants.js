const express = require("express");
const router = express.Router();
const { Restaurant, timeslots } = require("../models/Restaurant");

// Create new restaurant document
router.post("/", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const weekdays = req.body.weekdays;
  const tablenumber = req.body.tablenumber;
  const tables = req.body.tables;
  const openingtimes = req.body.openingtimes;
  console.log(openingtimes);

  // map the timeslots array with the openingtimes in combined
  let combined = timeslots.map(timeSlotObj => {
    let businessTime = openingtimes[timeSlotObj.day];
    if (businessTime.opentime) {
      for (let key in timeSlotObj.timeslots) {
        let timeNum = Number(key);
        let openingTime = businessTime.opentime;
        let closingTime = businessTime.closetime;

        if (timeNum < closingTime && timeNum > openingTime)
          timeSlotObj.timeslots[key] = true;
      }
      return timeSlotObj;
    } else return timeSlotObj;
  });

  const owner = req.user._id;
  // console.log("Weekdays from server", weekdays);
  Restaurant.create({
    name: name,
    address: address,
    phone: phone,
    email: email,
    weekdays: weekdays,
    tablenumber: tablenumber,
    tables: tables,
    openingtime: openingtimes,
    timeslots: combined,
    owner: owner
  })
    .then(restaurant => {
      console.log(restaurant);
      res.json(restaurant);
    })
    .catch(err => {
      res.json(err);
    });
});

// Gets data from existing restaurant document
router.get("/", (req, res) => {
  const user = req.user._id;

  Restaurant.findOne({ owner: user })
    .then(restaurant => {
      console.log(restaurant);
      res.json(restaurant);
    })
    .catch(err => {
      res.json(err);
    });
});

//Update existing restaurant document
//ADD PUT ROUTE

module.exports = router;
