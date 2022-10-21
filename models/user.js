"user strict";

const User = function (user) {
  this.firstName = user.firstname,
  this.lastName = user.lastname,
  this.email = user.email,
  this.gender = user.gender,
  this.isMember = user.member,
  this.yearJoinOasis = user.yearJoin,
  this.isWorker = user.serve,
  this.department = user.department,
  this.phoneNumber = user.phone,
  this.whatsappNumber = user.whatsapp,
  this.ageRange = user.age,
  this.hasMedicalCondition = user.accomodation,
  this.isMedicalPractitioner = user.practitioner,
  this.canLiftHeavyObject = user.liftobject,
  this.isWorkOffWork = user.weekoffwork,
  this.daysToBeAvailable = user.days.filter((value) => value?.trim().length > 0).join(','),
  this.preferredTeam = user.team,
  this.mediaSkill = user.media
 // this.createdAt = new Date();
 // this.updatedAt = new Date();
};

User.create = function (user, result) {
  connection.query("INSERT INTO users set ?", user, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
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
