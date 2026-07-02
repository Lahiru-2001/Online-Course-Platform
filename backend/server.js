// Quick fix for Node versions older than v19, because Mongoose 9+ really wants that Web Crypto API!
if (!global.crypto) {
  global.crypto = require('crypto').webcrypto;
}

// Load up our environment variables from the .env file
require('dotenv').config();

const connectDB = require('./src/config/db');
const app = require('./src/app');

// Kick off the database connection
connectDB();

// Decide which port to run on (fallback to 5000 if not set in .env)
const PORT = process.env.PORT || 5000;

// Fire up the server!
app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on port ${PORT}`);
});
