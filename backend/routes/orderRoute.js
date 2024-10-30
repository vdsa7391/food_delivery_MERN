import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder,verifyOrder,userOrders ,listOrders,updateStatus, clear_cartData ,placeOrderWithToken } from '../controllers/orderController.js'


const orderRouter = express.Router();

orderRouter.post("/placeOrder",/* authMiddleware, */ placeOrder)
orderRouter.post("/placeOrderWithToken", authMiddleware,  placeOrderWithToken)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userOrders",authMiddleware, userOrders)
orderRouter.post("/clearCartData",authMiddleware, clear_cartData)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)


export default orderRouter;