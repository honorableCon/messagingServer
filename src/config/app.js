require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

app.use(express.json());

module.exports = { app, server };
