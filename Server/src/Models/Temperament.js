const { DataTypes } = require("sequelize");
const sequelize = require("../DB/database");

module.exports = sequelize.define("Temperament", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {timestamps:false,})