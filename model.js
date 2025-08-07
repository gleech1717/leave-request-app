const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const LeaveRequest = sequelize.define('LeaveRequest', {
  name: DataTypes.STRING,
  dates: DataTypes.STRING,
  status: { type: DataTypes.STRING, defaultValue: 'Pending' },
  requestedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

module.exports = { sequelize, LeaveRequest };