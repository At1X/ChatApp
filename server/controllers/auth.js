import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { isDisposableEmail } from "../utils/checkDispose";
import { filterObj } from "../utils/filterObj";
import otpGenerator from "otp-generator";

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_TOKEN);

// login auth
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Email and Password are required",
    });
  }

  const authUser = await User.findOne({ email: email }).select("+password");

  // check if user is present in DB
  if (
    !authUser ||
    !(await authUser.correctPassword(password, authUser.password))
  ) {
    res.status(400).json({
      status: "error",
      message: "Incorrect Email or Password",
    });
  }

  const token = signToken(authUser._id);

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
  });
};

// register auth
export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "password"
  ); // filter request according to allowed fields

  // Check if email is disposable
  const isDisposable = await isDisposableEmail(email);

  if (isDisposable) {
    return res.status(400).json({
      status: "error",
      message: "Disposable email addresses are not allowed.",
    });
  }

  // check if email exists and is verified in db
  const existing_user = await User.findOne({ email: email });

  // check of verified users
  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email already exists",
    });
  }
  // check of non verified users
  else if (existing_user) {
    await User.findOneAndUpdate({ email: email }, filteredBody, {
      new: true,
      validateModifiedOnly,
    });
    req.userId = existing_user._id;
    next();
  }

  // check for non registered users
  else {
    const new_user = await User.create(filteredBody);

    // generating otp and email verification
    req.userId = new_user.id;
    next();
  }
};

// Sending OTP
export const sendOtp = async (req, res, next) => {
  const { userId } = req;

  // generating new otp
  const new_otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  // otp expiry
  const otp_expiry_time = Date.now() + 10 * 60 * 1000; // expired in 10mins

  // updating otp and expiry time
  await User.findByIdAndUpdate(userId, {
    otp: new_otp,
    otp_expiry_time,
  });

  res.status(200).json({
    status: "success",
    message: "OTP Sent",
  });
};

// Verifying OTP and updating verified status
export const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  // error handling for OTP
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "OTP Expired or Invalid Email",
    });
  }

  // method defined on userModel | Invalid OTP
  if (!(await user.correctOTP(otp, user.otp))) {
    res.status(400).json({
      status: "error",
      message: "Incorrect OTP",
    });
  }

  //  updating verified status
  user.verified = true;
  user.otp = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  // set user status to logged in
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP verified",
    token,
  });
};

// Forgot password
export const forgotPassword = async (req, res, next) => {};

// Reset password
export const resetPassword = async (req, res, next) => {};
