import User from "../user/userModel.js";

// Convert a user to admin (Admin functionality)
export const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.isAdmin = true;
    await user.save();

    res.json({ msg: "User promoted to admin" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Activate or deactivate a user account (Admin functionality)
export const toggleUserActivation = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: 0 });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User account ${user.isActive ? "activated" : "deactivated"}`,
      status: 1,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   GET api/admin/users/:userId
// @desc    Get user by ID
// @access  Admin
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/admin/users/:userId
// @desc    Update user by ID
// @access  Admin
export const updateUser = async (req, res) => {
  const { username, email, mobileNumber, shopDetails, isActive } = req.body;

  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.mobileNumber = mobileNumber || user.mobileNumber;
    user.shopDetails = shopDetails || user.shopDetails;
    user.isActive = typeof isActive !== "undefined" ? isActive : user.isActive;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/admin/users/:userId
// @desc    Delete user by ID
// @access  Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
