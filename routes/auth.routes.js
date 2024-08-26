// /**
//  * POST localhost:8080/ecomm/api/v1/auth/signup
//  */
// /**
//  * I need to intercept this
//  */
// const authController = require("../controllers/auth.controller")
// const authMW = require("../middlewares/auth.mw")

// module.exports = (app)=>{
//     app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignUpBody], authController.signup)    
// }

// // if a POST call is make at this api /ecomm/api/v1/auth/signup, then the control will handover to the authController.signup and 
// //  signup method should be called   



// /**!
//  *routes for  
//  *POST localhost:8080/ecomm/api/v1/auth/signin
//  */
// app.post("/ecomm/api/v1/auth/signin", authController.signin)




const express = require('express');
const authController = require("../controllers/auth.controller");
const authMW = require("../middlewares/auth.mw");

const router = express.Router();

// Route for user signup
router.post("/ecomm/api/v1/auth/signup", [authMW.verifySignUpBody], authController.signup);

// Route for user signin
router.post("/ecomm/api/v1/auth/signin", authController.signin);

module.exports = router;
