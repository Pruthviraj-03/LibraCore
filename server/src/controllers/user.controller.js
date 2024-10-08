import { users } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { CookieToken } from "../utils/CookieToken.utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate Access and Refresh Tokens
const generateAccessAndRefreshTokens = async (userId) => {
  const user = await users.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.accessToken = accessToken;
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await users.findById(decodedToken?.id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or invalid");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    // Set cookies using CookieToken function
    CookieToken(user, res, { accessToken, refreshToken });

    res.json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access token refreshed"
      )
    );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// Signup Controller
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await users.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  // Create new user
  const user = await users.create({
    name,
    email,
    password,
    role,
  });

  // Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // Set tokens in cookies
  CookieToken(user, res, { accessToken, refreshToken });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user, accessToken, refreshToken },
        "User signed up successfully"
      )
    );
});

// Login Controller
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await users.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // Set tokens in cookies
  CookieToken(user, res, { accessToken, refreshToken });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "Login successful"
      )
    );
});

// Logout Controller
const logout = asyncHandler(async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };
    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .clearCookie("userId", options)
      .clearCookie("user", options)
      .json(new ApiResponse(200, {}, "User logged out successfully"));

    console.log("User logged out successfully");
  } catch (error) {
    console.log("Failed to logout:", error);
    throw new ApiError(401, error?.message || "Failed to logout");
  }
});

// Delete Me Controller
const deleteMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find and delete the user
  const user = await users.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Clear cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .clearCookie("userId", options)
    .clearCookie("user", options)
    .json(new ApiResponse(200, {}, "User account deleted successfully"));

  console.log("User account deleted successfully");
});

// Get My Data Controller
const getMyData = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await users.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { user }, "User data retrieved successfully"));
});

export { refreshAccessToken, signup, login, logout, deleteMe, getMyData };
