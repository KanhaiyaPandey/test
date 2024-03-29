import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import User from "../models/userModel.js";

export const register = async(req, res) =>{
    const isFirst = await User.countDocuments() === 0;
    req.body.role = isFirst? "admin": "user";
 
    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword;

    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);
      req.body.avatar = response.secure_url;
      req.body.avatarPublicId = response.public_id;
    }

    const user = req.body;
    

      await User.create(user)
    res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) =>{
  const user = await User.findOne({email: req.body.email});  
  const isValidUser = user && (await comparePassword(req.body.password, user.password));
  if(!isValidUser) throw new UnauthenticatedError("invalid credentials");
    const token = createJWT({userId: user._id, role: user.role});
    const oneDay = 60*60*1000*24;

    res.cookie("token", token,{ 
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production"
})
  res.status(StatusCodes.OK).json({msg: "logged in succesfully"})
};


export const logout = (req, res) =>{
    res.cookie("token", "logout",{
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({msg: "user logged out"});
  }