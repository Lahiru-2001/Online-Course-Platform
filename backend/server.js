import http from "http";
import dotenv from "dotenv";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initializeSocket } from "./src/socket/socket.js";

dotenv.config();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});