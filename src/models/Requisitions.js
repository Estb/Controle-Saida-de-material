const Sequelize = require('sequelize')
const database = require('../database/database')


const Requisitions = database.define('requisitions', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
    title:{
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  author: {
    allowNull: false,
    type: Sequelize.STRING(40),
  },
  description: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  reason: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  mreturn:{
    allowNull: false,
    type: Sequelize.INTEGER
  },
  date_return:{
    allowNull:true,
    type:Sequelize.DATE
  },
  auditor_out:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [2, 40]
    }
  },
  auditor_return:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [2, 40]
    }
  },
  autorize1_by:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [2, 40]
    }
  },
  autorize2_by:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [2, 40]
    }
  },
  autorize3_by:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [2, 40]
    }
  },
  authorized:{
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  }
})

module.exports = Requisitions