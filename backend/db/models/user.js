'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50],
        isNotEmail(value) {
          if (validator.isEmail(value)) {
            throw new Error('Cannot be email.')
          }
        },
      },
    },
    fullName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: [ 'hashedPassword', 'email', 'createdAt', 'updatedAt' ],
      },
    },
    scopes: {
      currentUser: {
        attributes: {exclude:  ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  })
  User.associate = function(models) {
    // association are defined here
  };
  return User;
};
