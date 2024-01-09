import {body,param ,validationResult} from "express-validator"
import User from "../models/userModel.js";
import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js";

const withValidationErrors = (validateValues)=>{
    return [
        validateValues, 
        (req,res,next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              const errorMessage = errors.array().map((error) => error.msg);
              if(errorMessage[0].startsWith("not authorized")){
               if(!isAdmin) throw new UnauthenticatedError("not authorized to access this route")
              }
              throw new BadRequestError(errorMessage);
            }
            next();
     },
  ];
};


export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
   body("email").notEmpty().withMessage("email is required")
   .isEmail().withMessage("invalid email please enter valid email")
   .custom(async (email) =>{
          const user = await User.findOne({email});
          if(user) throw new BadRequestError("email already exists")
   }),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be 8 characters long"),
  ]);


  export const validateLoginInput = withValidationErrors([
    body("email").notEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid email please enter valid email"),
  
    body("password").notEmpty().withMessage("password is reqired"),
 ]);


