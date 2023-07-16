import express  from "express";
import {
     registerController,
     loginController,
     testController,
     forgotPasswordController,
     updateProfileController,
     getOrdersControllers,
     getAllOrdersControllers,
     orderStatusControllers,
     getAllUsersControllers
} from "../controllers/authController.js"

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// router object
const router=express.Router();

// routing 
// REGISTER || METHOD POST
router.post('/register',registerController);

// LOGIN  ||POST
router.post('/login',loginController)

// Forgot Password
router.post('/forgot-password',forgotPasswordController);

// test routes (its a protected rotes for checking purpose only)
// requireSignIn is for verifying the route that it is login and isAdmin is for testing whether it is Admin or not
router.get('/test',requireSignIn,isAdmin,testController);

// protected User route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

// protected Admin route auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

// for updating the profile
router.put('/profile',requireSignIn,updateProfileController);

// order
router.get("/orders",requireSignIn,getOrdersControllers);


// All order
router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersControllers);


// update order status
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusControllers);

// all user data
router.get("/all-users",requireSignIn,isAdmin,getAllUsersControllers)

export default router;