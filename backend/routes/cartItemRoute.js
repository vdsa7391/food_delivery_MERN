import express from "express"
import {add_cartItem, remove_cartItem, update_cartItem, add_quantity, add_val,calculate_price
    ,get_cartItem } from '../controllers/cartItemsController.js'
import authMiddleware from '../middleware/auth.js'

const cartItemRouter = express.Router();



cartItemRouter.post("/add",authMiddleware, add_cartItem);
cartItemRouter.post("/quantity",authMiddleware, add_quantity);
cartItemRouter.post("/val",authMiddleware, add_val);
cartItemRouter.post("/remove",authMiddleware, remove_cartItem);
cartItemRouter.post("/update",authMiddleware, update_cartItem);
cartItemRouter.post("/total",authMiddleware, calculate_price);
cartItemRouter.post("/get",authMiddleware, get_cartItem);

export default cartItemRouter;