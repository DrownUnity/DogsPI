const { DataTypes } = require("sequelize");
const sequelize = require("../DB/database");

module.exports = sequelize.define("Dog", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    heightMin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    heightMax: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weightMin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weightMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lifeSpan: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
});
