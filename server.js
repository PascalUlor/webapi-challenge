const express = require("express");

const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(express.json());

const logger = (req, res, next) => {
  console.log({
    Method: req.method,
    Url: req.originalUrl,
    Date: new Date()
  });

  res.on("finish", () => {
    console.log(
      { Status: res.statusCode, Message: res.statusMessage },
      `${res.get("Content-Length") || 0}b sent`
    );
  });

  next();
};

server.use(logger);
module.exports = server;
