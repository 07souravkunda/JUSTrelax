const AppError = require("../utils/appError");
const axios = require("axios");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const util = require("util");
const { OAuth2Client } = require("google-auth-library");
const catchAsync = require("../utils/catchAsync");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const app_token = async (access_token) => {
  try {
    let token = await axios.get(
      `https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&grant_type=client_credentials`
    );
    token = token.data.access_token;
    const data = await axios.get(
      `https://graph.facebook.com/debug_token?input_token=${access_token}&access_token=${token}`
    );

    return data;
  } catch (er) {
    return next(new AppError("Access denied", 404));
  }
};

const verify = async (token) => {
  try {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];

    console.log(payload);
    const user = {
      email: payload.email,
      name: payload.name,
      userId,
    };
    return user;
  } catch (er) {
    console.log(er);
  }
};

const facebookLogin = async (req) => {
  const resp = await app_token(req.body.accessToken);
  const data = await axios.get(
    `https://graph.facebook.com/me?fields=name,email,id&access_token=${req.body.accessToken}`
  );
  const input = {
    name: data.data.name,
    email: data.data.email,
    userId: data.data.id,
  };
  return input;
};

const googleLogin = async (req) => {
  try {
    const user = await verify(req.body.accessToken);
    return user;
  } catch (er) {
    console.log(er);
  }
};

const login = async (input) => {
  user = await User.findOne({ userId: input.userId });

  if (user) {
  } else {
    user = await User.create(input);
  }
  token = jwt.sign({ id: user.userId }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.signin = catchAsync(async (req, res, next) => {
  let input;
  if (req.body.method === "facebook") {
    input = await facebookLogin(req);
  } else if (req.body.method === "google") {
    input = await googleLogin(req);
  }
  const token = await login(input);

  if (token) {
    res.cookie("jwt", token);
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  }
});

exports.sendProtect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("Not logged in"), 404);
  }

  const decoded = await util.promisify(jwt.verify)(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_PRIVATE_KEY
  );

  const freshUser = await User.findOne({ userId: decoded.id });

  if (!freshUser) {
    return next(new AppError("User does not exist"));
  }
  // if (freshUser.isPasswordChanged(freshUser.passwordCreatedAt, decoded.iat)) {
  //   return next(new AppError('User has changed the password!'));
  // }
  req.user = freshUser;
  next();
});

exports.signinDetails = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(200).json({
      status: "success",
      signin: false,
    });
  }
  const decoded = await util.promisify(jwt.verify)(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_PRIVATE_KEY
  );

  const freshUser = await User.findOne({ userId: decoded.id });
  if (!freshUser) {
    return next(new AppError("User does not exist"));
  }
  return res.status(200).json({
    status: "success",
    user: freshUser.userId,
    signin: true,
  });
});

exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    data: null,
  });
};
