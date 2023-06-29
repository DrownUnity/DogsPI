const { DataTypes } = require("sequelize");
const sequelize = require("../DB/database");

const Temperament = sequelize.define("Temperament", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Temperament;
