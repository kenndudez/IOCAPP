"user strict";
var nodemailer = require('nodemailer');
const User = function (user) {
  this.email = user.email;
  this.password= user.password; 
  this.passwordHash= user.passwordHash; 
  this.firstName = user.firstName; 
  this.lastName = user.lastName; 
  this.role = user.role; 
  this.gender = user.gender; 
  this.phoneNumber = user.phoneNumber; 
  this.isSteward = user.isSteward; 
    this.department = user.department; 
    this.occupation = user.occupation; 
    this.emergencyName = user.emergencyName; 
    this.emergencyNumber = user.emergencyNumber; 
    this.currentChurch= user.currentChurch;  
    this.daysToBeAvailable = user.daysToBeAvailable; 
    this.numberOfYearsInOasis = user.numberOfYearsInOasis; 
    this.yearJoinOasis = user.yearJoinOasis; 
    this.isDisability = user.isDisability;
    this.reasonForService = user.isMedical;
    this.isMedical = user.isMedical;
    this.isHeavyLift = user.isHeavyLift;
    this.isWorkOff = user.isWorkOff;
    this.additionalComment = user.additionalComment;
    this.whatsappNumber = user.whatsappNumber;
    this.ageRange = user.ageRange;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  //this.createdAt = new Date();
 // this.updatedAt = new Date();
};

User.create = function (user, result) {
  connection.query("INSERT INTO users set ?", user, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, "User successfully created!");
      sendEmail(user.email, user.firstName);
    }
  });
};
function sendEmail(userEmail, firstName){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'oasisoiconference@gmail.com',
      pass: 'pfxcgbxtslnsqwax' 
    }
  });
  var mailOptions = {
    from: 'oasisoiconference@gmail.com',
    to: userEmail,
    subject: 'Successful Submission of Form',
    text: `Dear ${firstName},\nThank you for volunteering to serve at this years OIC.\n We are delighted and looking forward to having you give yourself to God as He grants you grace.\n We pray that the Lord keeps you steadfast in Jesus’ name,Amen!\n\nWith Love,OCPC Volunteer Coordinator,\n\nOIC 2022`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 }
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
