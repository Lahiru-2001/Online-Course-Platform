export const registerValidation = (req, res, next) => {
  const { fullName, email, password, confirmPassword } = req.body;

  // Full Name

  if (!fullName || fullName.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Full Name is required",
    });
  }

  // Email

  if (!email || email.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  // Password

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  // Confirm Password

  if (!confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Confirm Password is required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  next();
};

// Login Validation
export const loginValidation = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || email.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Email is required."
        });
    }

    const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email address."
        });
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required."
        });
    }

    next();

};