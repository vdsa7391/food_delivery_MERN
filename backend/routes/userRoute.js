import express from 'express'
import { login_user, register_user } from '../controllers/userController.js'


const userRouter= express.Router()

userRouter.post("/register", register_user)
userRouter.post("/login", login_user)


export default userRouter;