import User from "../models/User.js";


//Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    console.log("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


//Get Single User

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update User Status

export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User status updated successfully.",
      user,
    });
  } catch (error) {
    console.log("Update Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete User

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.log("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};