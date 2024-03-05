const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const driversRouter = require('./routes/driversRouter')
const teamRouter = require('./routes/teamRouter')

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

 server.use('/drivers', driversRouter);
 server.use('/team', teamRouter)



module.exports = server;
