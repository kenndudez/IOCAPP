const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: true },
        passwordHash: { type: DataTypes.STRING, allowNull: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: true },
        gender: {type: DataTypes.STRING, allowNull: false},
          phoneNumber: {type: DataTypes.STRING, allowNull: true},
          isSteward: {type: DataTypes.BOOLEAN, allowNull: false},
          department: { type: DataTypes.STRING, allowNull: false},
          occupation: {type: DataTypes.STRING, allowNull: false},
          emergencyName: {type: DataTypes.STRING, allowNull: false},
          emergencyNumber: {type: DataTypes.STRING, allowNull: false},
          currentChurch: {type: DataTypes.STRING, allowNull: true},
          daysToBeAvailable: {type: DataTypes.STRING, allowNull: true},
          numberOfYearsInOasis: {type: DataTypes.INTEGER, allowNull: true},
          yearJoinOasis: {type: DataTypes.STRING, allowNull: true},
          isDisability: {type: DataTypes.BOOLEAN, allowNull: false},
          reasonForService: {type: DataTypes.STRING, allowNull: true},
          isMedical: {type: DataTypes.BOOLEAN, allowNull: false},
          isHeavyLift: {type: DataTypes.BOOLEAN, allowNull: false},
          isWorkOff: {type: DataTypes.BOOLEAN, allowNull: false},
          additionalComment: {type: DataTypes.STRING, allowNull: true},
          whatsappNumber : {type: DataTypes.STRING, allowNull: true},
          ageRange : {type: DataTypes.STRING, allowNull: true},
    };
    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('User', attributes, options);
}