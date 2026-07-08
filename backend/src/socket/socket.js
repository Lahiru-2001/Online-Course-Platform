import { Server } from "socket.io";
let io;
const onlineUsers = new Map();

// Initialize Socket.IO

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    // User joins after login

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);

      socket.userId = userId;

      console.log(`${userId} joined`);

      io.emit("online-users", [...onlineUsers.keys()]);
    });

    // Disconnect

    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);

        io.emit("online-users", [...onlineUsers.keys()]);
      }

      console.log("Socket Disconnected:", socket.id);
    });
  });

  return io;
};

// Get Socket.IO instance

export const getIO = () => io;

// Get socket id of user

export const getUserSocket = (userId) => {
  return onlineUsers.get(userId);
};