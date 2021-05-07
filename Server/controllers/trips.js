const helperFunction = require('../helpers/helperFunction');
const Trip = require('../models/trips.models');

const getTrips = async (req, res) => {
  
  try {
    await Trip.retrieveAll(new Trip(req.body),(err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        console.log(json(data));
        return res.status(data.code).json(data);
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
  }
};

module.exports = postsController = {
  getTrips,
};
