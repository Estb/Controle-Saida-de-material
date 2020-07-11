const Sequelize = require('sequelize')
const database = require('../database/database')


const Users = database.define('users', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
    username:{
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(40),
  },
  lastname: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [8, 255]
    }
  },
  mail:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [2, 40]
    }
  },
  department:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [2, 40]
    }
  },
  role:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [2, 40]
    }
  },
  isAdmin:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [2, 40]
    }
  }
})

module.exports = Users