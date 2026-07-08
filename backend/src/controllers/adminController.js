import Admin from "../models/Admin.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/hashPassword.js";

// GET ADMIN PROFILE

export const getAdminProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user || user.userType !== "Administrator") {
      return res.status(404).json({
        success: false,
        message: "Administrator not found.",
      });
    }

    const admin = await Admin.findOne({ userId });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Administrator profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        phone: admin.phone,
        profileImage: admin.profileImage,

        email: user.email,
        userType: user.userType,
        status: user.status,
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

// UPDATE ADMIN PROFILE

export const updateAdminProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      firstName,
      lastName,
      phone,
      email,
      password,
    } = req.body;

    // Find User

    const user = await User.findById(userId);

    if (!user || user.userType !== "Administrator") {
      return res.status(404).json({
        success: false,
        message: "Administrator not found.",
      });
    }

    // Find Admin Profile

    const admin = await Admin.findOne({ userId });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Administrator profile not found.",
      });
    }

    // VALIDATION


    if (!firstName || firstName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "First name is required.",
      });
    }

    if (!lastName || lastName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Last name is required.",
      });
    }

    if (!phone || phone.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    //CHECK DUPLICATE EMAIL

    const existingEmail = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: userId },
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // UPDATE USER TABLE

    user.fullName = `${firstName} ${lastName}`;
    user.email = email.toLowerCase();

    if (password && password.trim() !== "") {

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters.",
        });
      }

      user.password = await hashPassword(password);
    }

    await user.save();

    //| UPDATE ADMIN TABLE

    admin.firstName = firstName;
    admin.lastName = lastName;
    admin.phone = phone;

    if (req.file) {
      admin.profileImage =
        "uploads/images/" + req.file.filename;
    }

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Administrator profile updated successfully.",
      admin: {
        firstName: admin.firstName,
        lastName: admin.lastName,
        phone: admin.phone,
        profileImage: admin.profileImage,
        email: user.email,
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