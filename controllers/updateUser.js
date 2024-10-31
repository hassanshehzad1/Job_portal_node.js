import addingToken from "../lib/addingToken.js";
import User from "../models/User.js";

const updateUser = async (req, res) => {
  const { name, email, age, location, username } = req.body;
  const _id = req.user.userId;

  console.log(_id);
  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { name, email, age, location, username },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: "Something went wrong" });

    // Updated token
    const token = addingToken(email, user._id);
    res.cookie("token", token);
    res.status(200).send({ message: "User updated Successfullt", user, token });

    // Catch error
  } catch (error) {
    if (error.code && error.code === 11000) {
      res.status(401).send({
        message: "Please input valid credentials",
        error,
      });
    }
    res.status(500).send({ message: "Error in updateControllers", error });
  }
};

export default updateUser;
