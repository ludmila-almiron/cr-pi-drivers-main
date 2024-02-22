const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const driversRouter = require('./routes/driversRouter')
const teamRouter = require('./routes/teamRouter')

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
 });
 
 server.use('/drivers', driversRouter);
 server.use('/team', teamRouter)



module.exports = server;
