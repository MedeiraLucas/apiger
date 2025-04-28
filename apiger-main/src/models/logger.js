const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const Logger = new mysql.Schema('Logger', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
  level: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'logs',
  timestamps: false
});

module.exports = mysql.model('Logger', Logger);