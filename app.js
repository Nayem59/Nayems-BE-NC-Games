const express = require("express");
const app = express();
// app.use(express.json());
const { getCategories } = require("./controllers/categories-controllers");
const { error500Status } = require("./controllers/error-controllers");

app.get("/api/categories", getCategories);

app.use(error500Status);

module.exports = app;
