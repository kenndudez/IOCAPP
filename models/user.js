"user strict";

const User = function (user) {
  this.firstName = user.firstName,
  this.lastName = user.lastName,
  this.email = user.email,
  this.gender = user.gender,
  this.isMember = user.isMember,
  this.yearJoinOasis = user.yearJoinOasis,
  this.isWorker = user.isWorker,
  this.department = user.department,
  this.phoneNumber = user.phoneNumber,
  this.whatsappNumber = user.whatsappNumber,
  this.ageRange = user.ageRange,
  this.hasMedicalCondition = user.hasMedicalCondition,
  this.isMedicalPractitioner = user.isMedicalPractitioner,
  this.canLiftHeavyObject = user.canLiftHeavyObject,
  this.isWorkOffWork = user.isWorkOffWork,
  this.daysToBeAvailable = user.daysToBeAvailable,
  this.preferredTeam = user.preferredTeam,
  this.mediaSkill = user.mediaSkill
 // this.createdAt = new Date();
 // this.updatedAt = new Date();
};

User.create = function (user, result) {
  connection.query("INSERT INTO users set ?", user, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, "successful: "+res.insertId);
    }
  });
};

User.read = function (result) {
  connection.query("SELECT * FROM users", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.update = function (id, user, result) {
  connection.query("UPDATE users SET ? WHERE _id = ?", [user, id], function (
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

User.delete = function (id, result) {
  connection.query("DELETE FROM users WHERE _id = ?", [id], function (
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

module.exports = User;
