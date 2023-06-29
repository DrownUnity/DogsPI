const app = require("./app");
const sequelize = require("./DB/database")
const Dogs = require("./Models/Dog");
const Temperament = require("./Models/Temperament")


async function main(){
    try{
        await sequelize.sync();
        app.listen(3001);
console.log("Server listeing on port 3001")
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
}

Dogs.belongsToMany(Temperament, {through: "dogTemperaments"})
Temperament.belongsToMany(Dogs, {through: "dogTemperaments"})

main();