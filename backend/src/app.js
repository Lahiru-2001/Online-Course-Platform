const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// Body parser
app.use(express.json());

// Helmet Security
app.use(helmet());

// Morgan Logger
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message:{
        message:"Too many requests, try again later"
    }
});

app.use(limiter);

app.use(errorHandler);

module.exports = app;