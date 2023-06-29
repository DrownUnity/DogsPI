const express = require("express");
const routers = require("./Routes/routes")
const cors = require('cors')

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001']
}));
app.use(express.json());
app.use(routers)

module.exports= app;