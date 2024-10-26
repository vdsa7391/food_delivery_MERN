import express from 'express'
import {addToCart, removeToCart, getCart, update_cart} from '../controllers/cartControllers.js'
import authMiddleWare from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post("/add", authMiddleWare,addToCart)
cartRouter.post("/remove", authMiddleWare,removeToCart)
cartRouter.post("/get", authMiddleWare,getCart)
cartRouter.post("/update", authMiddleWare,update_cart)

export  default cartRouter;