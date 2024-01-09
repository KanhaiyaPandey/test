import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { UnauthorizedError } from "../errors/customErrors.js";
import { hashPassword } from "../utils/passwordUtils.js";
import cloudinary from "cloudinary"
import {promises as fs} from "fs"



export const getCurrentUser = async (req, res) =>{
    const userWithoutPassword = await User.findOne({_id: req.user.userId});
    const user = userWithoutPassword.toJSON();
    res.status(StatusCodes.OK).json({user});
}

export const getAllUsers = async (req, res) =>{
    if(req.user.role !== "admin") throw new UnauthorizedError("this action is only for admin");
    const Allusers = await User.find();

    const users = Allusers.map(user => user.toJSON());
    res.status(StatusCodes.OK).json({users});
}

export const createAdminAccount = async (req, res) =>{
  if(req.user.role !== "admin") throw new UnauthorizedError("this action is only for admin");
  
  req.body.role = "admin";
 
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
  res.status(StatusCodes.CREATED).json({ msg: "New admin created" });

}

export const updateUser = async (req, res) =>{
    const newUser = { ...req.body };
    const id = req.params.id;
    delete newUser.password;
    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);
      newUser.avatar = response.secure_url;
      newUser.avatarPublicId = response.public_id;
    }

    if(req.user.role === "admin" || req.user.userId === id){
      const updatedUser = await User.findByIdAndUpdate(id, newUser);
  
      if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
      }
      res.status(StatusCodes.OK).json({ msg: 'user updated' });
    }
  else{
    throw new UnauthorizedError("you are not authorized")
  }

}



export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (req.user.role === "admin" || req.user.userId === userId) {
    const removeUser = await User.findByIdAndDelete(userId);
    res.status(StatusCodes.OK).json({ msg: 'user deleted', user: removeUser });
  }else{
     throw new UnauthorizedError("you are not authorized")
  }
}