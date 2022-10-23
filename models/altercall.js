"alterCalls strict";

const AlterCalls = function (alterCall) {
  this.firstName = alterCall.firstName,
  this.lastName = alterCall.lastName,
  this.email = alterCall.email,
  this.gender = alterCall.gender,
  this.contactNumber = alterCall.contactNumber,
  this.contactAddress = alterCall.contactAddress, 
  this.prayerRequest = alterCall.prayerRequest
};

AlterCalls.create = function (alterCalls, result) {
  connection.query("INSERT INTO altercalls set ?", alterCalls, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, "successful: "+res.insertId);
    }
  });
};

AlterCalls.read = function (result) {
  connection.query("SELECT * FROM altercalls", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

AlterCalls.update = function (id, alterCall, result) {
  connection.query("UPDATE altercalls SET ? WHERE _id = ?", [alterCall, id], function (
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

AlterCalls.delete = function (id, result) {
  connection.query("DELETE FROM altercalls WHERE _id = ?", [id], function (
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

module.exports = AlterCalls;
