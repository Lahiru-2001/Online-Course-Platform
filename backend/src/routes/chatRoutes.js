import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
  getChatUsers,
  createConversation,
  getConversations,
  getMessages,
  sendMessage,
  markMessagesSeen,
} from "../controllers/chatController.js";

const router = express.Router();

router.get(
  "/users",
  protect,
  getChatUsers
);

router.get(
  "/conversations",
  protect,
  getConversations
);

router.post(
  "/conversation",
  protect,
  createConversation
);

router.get(
  "/messages/:conversationId",
  protect,
  getMessages
);

router.post(
  "/send",
  protect,
  sendMessage
);

router.put(
  "/seen/:conversationId",
  protect,
  markMessagesSeen
);

export default router;