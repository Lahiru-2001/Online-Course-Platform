// Notification Controller

const getNotifications = async (req, res) => res.json({ message: 'Get all notifications' });
const markAsRead = async (req, res) => res.json({ message: 'Mark notification as read' });
const deleteNotification = async (req, res) => res.json({ message: 'Delete notification' });

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification
};
