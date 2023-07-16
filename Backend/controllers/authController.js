import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';


// post register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;
    // validation
    if (!name || !email || !password || !phone || !address || !question) {
      return res.send({ message: "invalid credentials" });
    }
    //   check user
    const existingUser = await userModel.findOne({ email });
    // if user exist
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please login"
      })
    }
    // registering the users
    const hashedPassword = await hashPassword(password)
    //  save
    const user = new userModel({ name, email, phone, address, password: hashedPassword, question });
    user.save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user
    })

  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Registration',
      err
    })
  }
}


// POST LOGIN
export const loginController = async (req, res) => {
  try {

    const { email, password } = req.body;
    //  validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid crediential"
      })
    }
    // check user
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "invalid crediential"
      })
    }
    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password"
      })
    }

    // token 
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "ERROR in login",
      err
    })
  }
}


// forgot password Controllers
export const forgotPasswordController = async (req, res) => {
  try {

    const { email, question, newPassword } = req.body;
    if (!email || !question || !newPassword) {
      res.status(400).send({
        message: "please Fill all the required field"
      })
    }
    //  check email means user exist or not
    const user = await userModel.findOne({ email, question })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer"
      })
    }
    if (user && !question) {
      return res.status(404).send({
        success: false,
        message: "Wrong Childhood name"
      })
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully"
    });

  } catch (err) {
    console.log(err);

    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      err
    })
  }
}


// test controllers
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "not protected the routes correctly",
      error
    })
  }
}


// for update the profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 4) {
      return res.json({ error: "Passsword is required and 4 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
}


// orders of users
export const getOrdersControllers = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
}


// Admin have access to all orders
export const getAllOrdersControllers = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
}


// order status
export const orderStatusControllers = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
}

// all users data
export const getAllUsersControllers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting the users data",
      error
    })
  }
}


