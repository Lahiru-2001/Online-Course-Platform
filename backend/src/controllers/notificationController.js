const Notification = require('../models/Notification');

// Fetch all notifications for the logged-in user
const getNotifications = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Need a user ID to grab notifications.' });
    }

    // Get all notifications for this user, newest first
    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to load notifications.' });
  }
};

// Mark a specific notification as read so it stops pestering the user
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user ? req.user.id : req.body.userId;

    // Make sure we're updating a notification that actually belongs to this user
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { isRead: true },
      { new: true } // Return the updated document
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found or doesn\'t belong to you.' });
    }

    res.status(200).json({
      message: 'Marked as read!',
      notification,
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error while updating the notification.' });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
};
