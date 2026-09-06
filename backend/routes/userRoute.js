import express from "express";
import authUser from "../middleware/Auth.js";
import{loginUser,registerUser,adminLogin,getProfile} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin",adminLogin);
userRouter.get("/profile", authUser, getProfile);

export default userRouter;