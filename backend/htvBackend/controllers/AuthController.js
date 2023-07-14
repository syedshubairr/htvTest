import User from "../models/user.js";
import bcryptjs from "bcryptjs";
const { compareSync, hashSync } = bcryptjs;
import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const isExist = await User.find({ email });
  if (isExist && isExist.length) {
    return res.status(400).json({ message: "User Already Exist" });
  }
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  const hash = hashSync(password);
  let user;
  try {
    user = new User({ name, email, password: hash });
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ user });
};

export const loginUser = (req, res, next) => {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (user) {
      compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = sign(
            { name: user.name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          let refreshToken = sign(
            { name: user.name },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "48h" }
          );
          res.json({
            message: "Login Successful",
            token,
            refreshToken,
          });
        } else {
          res.json({
            message: "password does not matched",
          });
        }
      });
    } else {
      res.json({
        message: "No User found",
      });
    }
  });
};
export const refreshToken = (res, req, next) => {
  const refreshtok = req.body.refreshToken;
  verify(refreshtok, process.env.REFRESH_TOKEN_SECRET, function (err, decode) {
    if (err)
      res.status(400).json({
        err,
      });
    else {
      let token = sign({ name: decode.name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "60s",
      });
      res.status(200).json({
        message: "refreshed Token",
        token,
        refreshtok,
      });
    }
  });
};

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  res.status(200).json({ users });
};
