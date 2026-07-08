import API from "./api";

// Get users available for chat

export const getChatUsers = async () => {
  const { data } = await API.get("/chat/users");
  return data;
};

// Get all conversations
export const getConversations = async () => {
  const { data } = await API.get("/chat/conversations");
  return data;
};

// Create (or get existing) conversation
export const createConversation = async (receiverId) => {
  const { data } = await API.post(
    "/chat/conversation",
    {
      receiverId,
    }
  );

  return data;
};

// Get conversation messages
export const getMessages = async (
  conversationId
) => {
  const { data } = await API.get(
    `/chat/messages/${conversationId}`
  );

  return data;
};

// Send message
export const sendMessage = async ({
  conversationId,
  receiverId,
  text,
}) => {
  const { data } = await API.post(
    "/chat/send",
    {
      conversationId,
      receiverId,
      text,
    }
  );

  return data;
};

// Mark messages as seen

export const markMessagesSeen = async (
  conversationId
) => {
  const { data } = await API.put(
    `/chat/seen/${conversationId}`
  );

  return data;
};