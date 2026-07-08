import User from "../models/User.js";
import InstructorProfile from "../models/InstructorProfile.js";
import Enrollment from "../models/Enrollment.js";
import Withdrawal from "../models/Withdrawal.js";
import { hashPassword } from "../utils/hashPassword.js";

// GET Instructor Earnings
export const getInstructorEarnings = async (req, res) => {
  try {
    const instructorId = req.user._id;

    // Total student payments
    const earnings = await Enrollment.aggregate([
      {
        $match: {
          instructor: instructorId,
          paymentStatus: "Completed",
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: "$paymentAmount",
          },
        },
      },
    ]);

    const totalIncome =
      earnings.length > 0 ? earnings[0].totalIncome : 0;

    // Instructor receives only 80%
    const instructorIncome = totalIncome * 0.8;

    // Previous withdrawals
    const withdrawals = await Withdrawal.aggregate([
      {
        $match: {
          instructor: instructorId,
          status: {
            $in: ["Pending", "Approved"],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalWithdraw: {
            $sum: "$withdrawAmount",
          },
        },
      },
    ]);

    const totalWithdraw =
      withdrawals.length > 0
        ? withdrawals[0].totalWithdraw
        : 0;

    const accountBalance =
      instructorIncome - totalWithdraw;

    return res.json({
      success: true,
      totalIncome,
      instructorIncome,
      totalWithdraw,
      accountBalance,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST Withdrawal
export const createWithdrawal = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const {
      amount,
      bankName,
      accountName,
      accountNumber,
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid withdrawal amount.",
      });
    }

    // Calculate total earnings
    const earnings = await Enrollment.aggregate([
      {
        $match: {
          instructor: instructorId,
          paymentStatus: "Completed",
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: "$paymentAmount",
          },
        },
      },
    ]);

    const totalIncome =
      earnings.length > 0 ? earnings[0].totalIncome : 0;

    const instructorIncome = totalIncome * 0.8;

    // Total already withdrawn
    const withdrawals = await Withdrawal.aggregate([
      {
        $match: {
          instructor: instructorId,
          status: {
            $in: ["Pending", "Approved"],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalWithdraw: {
            $sum: "$withdrawAmount",
          },
        },
      },
    ]);

    const totalWithdraw =
      withdrawals.length > 0
        ? withdrawals[0].totalWithdraw
        : 0;

    const availableBalance =
      instructorIncome - totalWithdraw;

    if (Number(amount) > availableBalance) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance.",
      });
    }

    const remainingBalance =
      availableBalance - Number(amount);

    const withdrawal = await Withdrawal.create({
      instructor: instructorId,
      totalEarnings: totalIncome,
      availableBalance,
      withdrawAmount: Number(amount),
      remainingBalance,
      bankName,
      accountName,
      accountNumber,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Withdrawal request submitted successfully.",
      withdrawal,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Withdrawal History
export const getWithdrawalHistory = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const history = await Withdrawal.find({
      instructor: instructorId,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET INSTRUCTOR PROFILE
export const getInstructorProfile = async (req, res) => {

  try {

    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user || user.userType !== "Instructor") {

      return res.status(404).json({
        success: false,
        message: "Instructor not found.",
      });

    }

    const profile = await InstructorProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Instructor profile not found.",
      });

    }

    return res.status(200).json({
      success: true,
      instructor: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        title: profile.title,
        specialization: profile.specialization,
        bio: profile.bio,
        profileImage: profile.profileImage,
        email: user.email,
        fullName: user.fullName,

      },

    });

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",

    });

  }

};


// UPDATE INSTRUCTOR PROFILE
export const updateInstructorProfile = async (req, res) => {

  try {
    const userId = req.user._id;
    const {
      firstName,
      lastName,
      email,
      title,
      specialization,
      bio,
      password,
    } = req.body;

    // Find User
    const user = await User.findById(userId);

    if (!user || user.userType !== "Instructor") {

      return res.status(404).json({
        success: false,
        message: "Instructor not found.",
      });

    }

    // Find Profile
    const profile = await InstructorProfile.findOne({ userId });

    if (!profile) {

      return res.status(404).json({
        success: false,
        message: "Instructor profile not found.",
      });

    }


    // Validation
    if (!firstName || firstName.trim() === "") {

      return res.status(400).json({
        success: false,
        message: "First Name is required.",
      });

    }

    if (!lastName || lastName.trim() === "") {

      return res.status(400).json({
        success: false,
        message: "Last Name is required.",
      });

    }

    if (!email || email.trim() === "") {

      return res.status(400).json({
        success: false,
        message: "Email Address is required.",
      });

    }

    if (!title || title.trim() === "") {

      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });

    }

    if (!specialization || specialization.trim() === "") {

      return res.status(400).json({
        success: false,
        message: "Specialization is required.",
      });

    }

    if (!bio || bio.trim() === "") {

      return res.status(400).json({
        success: false,
        message: "Professional Bio is required.",
      });

    }

    // Email Validation
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {

      return res.status(400).json({
        success: false,
        message: "Invalid Email Address.",

      });

    }

    // Duplicate Email
    const existingUser = await User.findOne({

      email: email.toLowerCase(),
      _id: { $ne: userId },

    });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "Email already exists.",

      });

    }


    // Update User Table
    user.fullName = `${firstName} ${lastName}`;
    user.email = email.toLowerCase();
    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 6 characters.",

        });

      }

      user.password = await hashPassword(password);

    }

    await user.save();

    // Update Instructor Profile Table
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.title = title;
    profile.specialization = specialization;
    profile.bio = bio;

    if (req.file) {

      profile.profileImage =
        `/uploads/images/${req.file.filename}`;

    }

    await profile.save();
    return res.status(200).json({

      success: true,
      message: "Instructor profile updated successfully.",

      instructor: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        title: profile.title,
        specialization: profile.specialization,
        bio: profile.bio,
        profileImage: profile.profileImage,
        email: user.email,
        fullName: user.fullName,

      },

    });

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",

    });

  }

};