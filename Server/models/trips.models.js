const helperFunction = require('../helpers/helperFunction');

// constructor
const Trip = function (trip) {
  this.from = trip.from;
  this.to = trip.to;
  this.time = trip.time;
  this.num = trip.num;
};

Trip.retrieveAll = (tripCon, result) => {
  const query = `SELECT t.tripName, t.Time, t.numOfSeat, r.from, r.dropOffPoint
                                FROM route r, trip t WHERE r.routeNum = t.routeNum
                                AND r.from = ? AND r.dropOffPoint = ?
                                AND DATE(t.Time) = ?`;
  console.log([tripCon.from, tripCon.to, tripCon.time]);
  pool.query(query, [tripCon.from, tripCon.to, tripCon.time], (err, results) => {
    console.log(results);
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        helperFunction.responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There are no trips',
          null
        ),
        null
      );
      return;
    }
    result(null, helperFunction.responseHandler(true, 200, 'Success', results));
  });
};

module.exports = Trip;
