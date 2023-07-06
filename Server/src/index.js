const app = require("./app");
const sequelize = require("./DB/database")
const Dog = require("./Models/Dog");
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

Dog.belongsToMany(Temperament, { through: "dogTemperaments" });
Temperament.belongsToMany(Dog, { through: "dogTemperaments" })

main();