import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashedPw = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPw,
    role
  });

  res.json({ message: "User created", user });
};

