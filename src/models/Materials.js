const Sequelize = require('sequelize')
const database = require('../database/database')


const Materials = database.define('materials', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  amount:{
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  title:{
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  }
}, {underscored: true})

module.exports = Materials

