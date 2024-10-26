import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import bodyParser from "body-parser"

import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import cartItemRouter from "./routes/cartItemRoute.js"




// app config
 
const app= express()
const port= process.env.PORT|| 4000;


//middleware

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));



// db connection
connectDB();

// api endpoints

app.use("/api/food",foodRouter)
app.use("/api/users", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/cartItem", cartItemRouter)

app.use("/images", express.static('uploads'))

app.get("/", (req,res)=>{
    res.send("API working")

})


// server listen

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
})
