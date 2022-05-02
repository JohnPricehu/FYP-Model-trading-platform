import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import {sendEmail} from "../sendEmail.js"
import Goods from "../models/goodsModel.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      // address: user.address,
      isAdmin: user.isAdmin,
      isMember: user.isMember,
      wallet:user.wallet,
      // pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, } = req.body;
  const userExists = await User.findOne({ name });
  const emailExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  if (emailExists) {
    res.status(404);
    throw new Error("This email has already been used");
  }

  const user = await User.create({
    name,
    email,
    password,
    // pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.wallet = req.body.wallet || user.wallet;
    user.isAdmin = req.body.isAdmin ;
    user.isMember = req.body.isMember ;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      wallet: updatedUser.wallet,
      isAdmin: updatedUser.isAdmin,
      isMember: updatedUser.isMember,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@description     Delete single user
//@route           GET /api/user/:id
//@access          Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // if (note.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (user) {
    await user.remove();
    const model = await Goods.findOne({owner : req.params.id})
    await model.remove()
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const viewUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.isAdmin = req.body.isAdmin 
    user.isMember = req.body.isMember 
    user.wallet = req.body.wallet || user.wallet;
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      isMember: updatedUser.isMember,
      wallet: updatedUser.wallet,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const payMembership = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user.isMember === false) {
    if(user.wallet >= 10 ){
    user.wallet = user.wallet - 10
    user.isMember = true
    const updatedUser =await user.save()
    res.json(updatedUser)
    const result = sendEmail(user.email,"Payment Attention","You are now a member, go and enjoy the privileges")   
    }else{
    res.status(404)
    throw new Error('Payment Failed! Check you wallet!')
    }
  }else {
      res.status(404)
      throw new Error('You are already a Member')
    }
})

export { authUser, updateUserProfile, registerUser, deleteUser, getUserById, viewUsers, updateUser,payMembership };