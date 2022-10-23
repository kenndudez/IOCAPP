"altarCalls strict";

const altarCalls = function (altarCall) {
  this.firstName = altarCall.firstName,
  this.lastName = altarCall.lastName,
  this.email = altarCall.email,
  this.gender = altarCall.gender,
  this.contactNumber = altarCall.contactNumber,
  this.contactAddress = altarCall.contactAddress, 
  this.prayerRequest = altarCall.prayerRequest
};

altarCalls.create = function (altarCalls, result) {
  connection.query("INSERT INTO altarcalls set ?", altarCalls, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, "successful: "+res.insertId);
    }
  });
};

altarCalls.read = function (result) {
  connection.query("SELECT * FROM altarcalls", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

altarCalls.update = function (id, altarCall, result) {
  connection.query("UPDATE altarcalls SET ? WHERE _id = ?", [altarCall, id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

altarCalls.delete = function (id, result) {
  connection.query("DELETE FROM altarcalls WHERE _id = ?", [id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = altarCalls;
