import User from "../models/User.js";
import hashingPassword from "../lib/hashPass.js";
import addingToken from "../lib/addingToken.js";

const register = async (req, res, next) => {
  try {
    const { name, email, username, password, age, location } = req.body;
    const userExist = await User.findOne({ email });

    // If User exist
    if (userExist)
      return res.status(404).send({
        success: false,
        message: "Credentials already registered",
      });

    // Hash password
    const hashPass = await hashingPassword(password);

    // User is not exist
    const user = await User.create({
      name,
      email,
      password: hashPass,
      location,
      username,
      age,
    });

    const token = addingToken(email, user._id);
    res.cookie("token", token);
    user.password = undefined;
    res.user = user;
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
export default register;
