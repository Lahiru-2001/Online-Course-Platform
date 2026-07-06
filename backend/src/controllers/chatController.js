// Chat Controller

const getMessages = async (req, res) => res.json({ message: 'Get all chat messages' });
const sendMessage = async (req, res) => res.json({ message: 'Send chat message' });

module.exports = {
  getMessages,
  sendMessage
};
