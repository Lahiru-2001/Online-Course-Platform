import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import { getIO, getUserSocket } from "../socket/socket.js";
import StudentProfile from "../models/StudentProfile.js";
import InstructorProfile from "../models/InstructorProfile.js";

// Remove duplicate users
const uniqueUsers = (users) => {
  const map = new Map();

  users.forEach((user) => {
    map.set(user._id.toString(), user);
  });

  return [...map.values()];
};

const attachProfileImages = async (users) => {

  const updatedUsers = await Promise.all(
    users.map(async (user) => {

      let profileImage =
        "/uploads/images/default-profile.png";


      if (user.userType === "Student") {

        const profile = await StudentProfile.findOne({
          userId: user._id,
        });

        console.log("--------------------");
        console.log("User:", user.fullName);
        console.log("User ID:", user._id);
        console.log("Profile:", profile);

        if (profile?.profileImage) {
          profileImage = profile.profileImage;
        }

      }


      if (user.userType === "Instructor") {

        const profile = await InstructorProfile.findOne({
          userId: user._id,
        });

        console.log("--------------------");
        console.log("User:", user.fullName);
        console.log("User ID:", user._id);
        console.log("Profile:", profile);

        if (profile?.profileImage) {
          profileImage = profile.profileImage;
        }

      }


      return {
        ...user.toObject(),
        profileImage,
      };

    })
  );


  return updatedUsers;

};

//GET CHAT USERS

export const getChatUsers = async (req, res) => {
  try {
    const currentUser = req.user;

    let users = [];

    // STUDENT
    if (currentUser.userType === "Student") {
      const enrollments = await Enrollment.find({
        student: currentUser._id,
      })
        .populate("student", "fullName email userType status")
        .populate("instructor", "fullName email userType status");

      // Instructors

      enrollments.forEach((item) => {
        if (item.instructor) {
          users.push(item.instructor);
        }
      });


      //Students in same courses
      const courseIds = enrollments.map((e) => e.course);

      const classmates = await Enrollment.find({
        course: {
          $in: courseIds,
        },
      }).populate(
        "student",
        "fullName email userType status"
      );

      classmates.forEach((item) => {
        if (
          item.student &&
          item.student._id.toString() !==
          currentUser._id.toString()
        ) {
          users.push(item.student);
        }
      });


      // Admins
      const admins = await User.find({
        userType: "Administrator",
        status: "Active",
      }).select("fullName email userType status");

      users.push(...admins);
    }


    // INSTRUCTOR

    else if (currentUser.userType === "Instructor") {
      const enrollments = await Enrollment.find({
        instructor: currentUser._id,
      }).populate(
        "student",
        "fullName email userType status"
      );

      enrollments.forEach((item) => {
        if (item.student) {
          users.push(item.student);
        }
      });

      const admins = await User.find({
        userType: "Administrator",
        status: "Active",
      }).select("fullName email userType status");

      users.push(...admins);
    }

    // ADMIN

    else if (currentUser.userType === "Administrator") {
      users = await User.find({
        _id: {
          $ne: currentUser._id,
        },

        status: "Active",
      }).select(
        "fullName email userType status"
      );
    }

    users = uniqueUsers(users);
    users = await attachProfileImages(users);

    users.sort((a, b) =>
      a.fullName.localeCompare(b.fullName)
    );


    // Response
    return res.status(200).json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to load chat users.",
    });
  }
};

// CREATE CONVERSATION

export const createConversation = async (req, res) => {
  try {
    const sender = req.user._id;
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver is required.",
      });
    }

    if (sender.toString() === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot chat with yourself.",
      });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found.",
      });
    }



    // Permission Check
    const role = req.user.userType;
    let allowed = false;

    // STUDENT
    if (role === "Student") {

      // Admin
      if (receiver.userType === "Administrator") {
        allowed = true;
      }

      // Instructor
      if (!allowed && receiver.userType === "Instructor") {
        const enrollment = await Enrollment.findOne({
          student: sender,
          instructor: receiver._id,
        });

        if (enrollment) {
          allowed = true;
        }
      }

      // Student
      if (!allowed && receiver.userType === "Student") {

        const myCourses = await Enrollment.find({
          student: sender,
        });

        const courseIds = myCourses.map(e => e.course.toString());

        const common = await Enrollment.findOne({
          student: receiver._id,
          course: {
            $in: courseIds,
          },
        });

        if (common) {
          allowed = true;
        }
      }

    }

    // INSTRUCTOR
    else if (role === "Instructor") {

      if (receiver.userType === "Administrator") {
        allowed = true;
      }

      if (!allowed && receiver.userType === "Student") {

        const enrollment = await Enrollment.findOne({
          instructor: sender,
          student: receiver._id,
        });

        if (enrollment) {
          allowed = true;
        }
      }

    }

    else if (role === "Administrator") {

      allowed = true;

    }

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to chat with this user.",
      });
    }


    // Existing Conversation

    let conversation = await Conversation.findOne({
      participants: {
        $all: [sender, receiverId],
      },
    });


    // Create New Conversation
    if (!conversation) {

      conversation = await Conversation.create({
        participants: [
          sender,
          receiverId,
        ],

      });

    }

    conversation = await Conversation.findById(
      conversation._id
    ).populate(
      "participants",
      "fullName email userType status"
    );

    return res.status(200).json({
      success: true,
      conversation,

    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to create conversation.",

    });

  }
};

// GET CONVERSATIONS
export const getConversations = async (req, res) => {

  try {

    const conversations =
      await Conversation.find({

        participants: req.user._id,

      })

        .populate(
          "participants",
          "fullName email userType status"
        )

        .populate(
          "lastSender",
          "fullName"
        )

        .sort({
          updatedAt: -1,
        });

    const formatted =
      conversations.map((conversation) => {

        const otherUser =
          conversation.participants.find(
            user =>
              user._id.toString() !==
              req.user._id.toString()
          );

        return {

          _id: conversation._id,
          user: otherUser,
          lastMessage:
            conversation.lastMessage,
          lastMessageAt:
            conversation.lastMessageAt,
          updatedAt:
            conversation.updatedAt,

        };

      });

    return res.status(200).json({

      success: true,
      total: formatted.length,
      conversations: formatted,

    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        "Unable to load conversations.",

    });

  }

};

// GET MESSAGES
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    const isParticipant = conversation.participants.some(
      (participant) =>
        participant.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this conversation.",
      });
    }

    const messages = await Message.find({
      conversation: conversationId,
    })
      .populate(
        "sender",
        "fullName email userType"
      )
      .populate(
        "receiver",
        "fullName email userType"
      )
      .sort({
        createdAt: 1,
      });

    return res.status(200).json({
      success: true,
      total: messages.length,
      messages,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to load messages.",
    });
  }
};

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const sender = req.user._id;

    const {
      conversationId,
      receiverId,
      text,
    } = req.body;

    if (!conversationId || !receiverId || !text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Conversation, receiver and message are required.",
      });
    }

    const conversation = await Conversation.findById(
      conversationId
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    const isParticipant = conversation.participants.some(
      (participant) =>
        participant.toString() === sender.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to send messages in this conversation.",
      });
    }

    const message = await Message.create({
      conversation: conversationId,
      sender,
      receiver: receiverId,
      text: text.trim(),
    });

    conversation.lastMessage = message.text;
    conversation.lastSender = sender;
    conversation.lastMessageAt = message.createdAt;

    await conversation.save();

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "fullName email userType")
      .populate("receiver", "fullName email userType");


    // Socket.IO
    const io = getIO();

    const receiverSocket = getUserSocket(
      receiverId.toString()
    );

    if (receiverSocket) {
      io.to(receiverSocket).emit(
        "receive_message",
        populatedMessage
      );
    }

    return res.status(201).json({
      success: true,
      message: populatedMessage,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to send message.",
    });
  }
};

// MARK MESSAGES AS SEEN
export const markMessagesSeen = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(
      conversationId
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    const isParticipant = conversation.participants.some(
      (participant) =>
        participant.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this conversation.",
      });
    }

    await Message.updateMany(
      {
        conversation: conversationId,
        receiver: req.user._id,
        seen: false,
      },
      {
        $set: {
          seen: true,
          seenAt: new Date(),
        },
      }
    );

    const io = getIO();

    const otherUser = conversation.participants.find(
      (participant) =>
        participant.toString() !== req.user._id.toString()
    );

    const otherSocket = getUserSocket(
      otherUser.toString()
    );

    if (otherSocket) {
      io.to(otherSocket).emit(
        "messages_seen",
        {
          conversationId,
          seenBy: req.user._id,
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Messages marked as seen.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to update seen status.",
    });
  }
};