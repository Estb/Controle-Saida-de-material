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
    type: Sequelize.BOOLEAN
  },
  date_return:{
    allowNull:true,
    type:Sequelize.DATE
  },
  date_out:{
    allowNull:true,
    type:Sequelize.DATE
  },
  security_out:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [1, 40]
    }
  },
  already_out:{
    allowNull: true,
    type: Sequelize.BOOLEAN
  },
  date_in:{
    allowNull:true,
    type:Sequelize.DATE
  },
  security_in:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [1, 40]
    }
  },
  already_in:{
    allowNull: true,
    type: Sequelize.BOOLEAN
  },
  authorize1_by:{
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  date_authorize1:{
    allowNull:true,
    type:Sequelize.DATE
  },
  authorize2_by:{
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  date_authorize2:{
    allowNull:true,
    type:Sequelize.DATE
  },
  authorize3_by:{
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  date_authorize3:{
    allowNull:true,
    type:Sequelize.DATE
  },
  authorized:{
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  already_audited:{
    allowNull: true,
    type: Sequelize.BOOLEAN
  },
  audited_by:{
    allowNull: true,
    type: Sequelize.STRING(40),
    validate: {
        len: [1, 40]
    }
  },
  date_audited:{
    allowNull:true,
    type:Sequelize.DATE
  },
}, {underscored: true})

module.exports = Requisitions

