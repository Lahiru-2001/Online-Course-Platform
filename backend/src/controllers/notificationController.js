const Notification = require('../models/Notification');

// Retrieve all notifications for the authenticated user
const getNotifications = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required to fetch notifications.' });
    }

    // Fetch all notifications for this user, sorted by newest first
    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to load notifications.' });
  }
};

// Update the read status of a specific notification
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user ? req.user.id : req.body.userId;

    // Verify ownership and update the notification
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.status(200).json({
      message: 'Notification marked as read.',
      notification,
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'An error occurred while updating the notification.' });
  }
};

// Delete a specific notification
const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user ? req.user.id : req.body.userId;

    const notification = await Notification.findOneAndDelete({ _id: notificationId, user: userId });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.status(200).json({ message: 'Notification deleted successfully.' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'An error occurred while deleting the notification.' });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
};
