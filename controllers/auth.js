import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, course, level, friends } = req.body;
    console.log(username);

    // Generate a salt with a specified number of rounds (e.g., 10)
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      course,
      level,
      friends,
    });

    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ error: "Username or Email already exists" });
    }

    const savedUser = await newUser.save();
    res.status(201).json({ message: "New User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};
//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    //Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); //JWT_SECRET is the secret key
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        course: user.course,
        level: user.level,
        friends: user.friends,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
