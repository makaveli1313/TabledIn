const { timeSlots } = require('../utils/timeSlots');
const { shellScript } = require('../google/ShellScript');
const Restaurant = require('../models/Restaurant');
const Project = require('../models/Project');

// @desc Create Restaurant
// @route POST /api/v2/restaurants/
// @access Client
exports.createRestaurant = async (req, res) => {
  const {
    name,
    address,
    phone,
    email,
    googleassistant,
    phonegateway,
    logo,
    menu,
    weekdays,
    tablenumber,
    tables,
    openingtimes,
  } = req.body;
  const owner = req.user._id;

  // map the timeslots with opening times
  try {
    const timeslots = await timeSlots(openingtimes);

    const data = {
      name,
      address,
      phone,
      email,
      googleassistant,
      phonegateway,
      logo,
      menu,
      weekdays,
      tablenumber,
      tables,
      openingtimes,
      timeslots,
      owner,
    };

    const restaurant = await Restaurant.create(data);
    const update = {
      $set: { name: restaurant.name, owner: true, restaurant: restaurant._id },
    };
    const option = { new: true };
    const query = { owner: false };
    const project = await Project.findOneAndUpdate(query, update, option);

    shellScript(project.id);

    console.log(
      `Restaurant by the name of ${name} was created by ${owner}`.brightGreen
    );
    res.json(restaurant);
  } catch (err) {
    res.json(err);
  }
};

// @desc Get Restaurant
// @route GET /api/v2/restaurants/
// @access Client
exports.getRestaurant = async (req, res) => {
  const user = req.user._id;
  const filter = { owner: user };
  try {
    const restaurant = await Restaurant.findOne(filter);
    res.json(restaurant);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// @desc Update Restaurant
// @route PUT /api/v2/restaurants/
// @access Client
exports.updateRestaurant = async (req, res) => {
  const user = req.user._id;

  const {
    name,
    address,
    phone,
    email,
    logo,
    menu,
    weekdays,
    tablenumber,
    tables,
    openingtimes,
  } = req.body;

  try {
    // map the timeslots array with the openingtimes in combined
    const timeslots = await timeSlots(openingtimes);

    const filter = { owner: user };
    const data = {
      name,
      address,
      phone,
      email,
      logo,
      menu,
      weekdays,
      tablenumber,
      tables,
      openingtimes,
      timeslots,
    };

    const restaurant = await Restaurant.findOneAndUpdate(filter, data, {
      new: true,
    });
    const id = `id${restaurant._id}`;
    console.log(restaurant);
    res.json(restaurant);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
