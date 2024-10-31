import addingToken from "../lib/addingToken.js";
import matchingPassword from "../lib/matchingPassword.js";
import User from "../models/User.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).send({
        message: "User Not Found! Please input valid credentials",
        email,
        password,
      });

    // Matching password
    const isValidPass = await matchingPassword(password, user.password);
    if (!isValidPass)
      res.status(401).send({
        message: "Please input valid email and password",
        email,
        password,
      });

    // Login successfully
    const token = addingToken(email, user._id);
    res.cookie("token", token);
    user.password = undefined;
    res.user = user;
    res.status(201).send({
      message: "Login Successfully",
      user,
      token,
    });

    // Errors
  } catch (error) {
    console.error(error);
    if (res.status === 11000) {
      return res
        .status(404)
        .send({ message: "Enter valid email and password", error });
    }
    res.status(500).send(error);
  }
};

export default login;
