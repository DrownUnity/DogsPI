const { DataTypes } = require("sequelize");
const sequelize = require("../DB/database");

const Dog = sequelize.define("Dog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  heightMin: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weightMin: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  heightMax: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weightMax: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lifeSpan: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false
});

module.exports = Dog;