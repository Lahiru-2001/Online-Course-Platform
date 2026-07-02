const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Basic welcome route
app.get("/", (req, res) => {
  res.send("Online Course Platform API is running...");
});

module.exports = app;
