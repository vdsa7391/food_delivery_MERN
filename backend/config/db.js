import mongoose from "mongoose"

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://khushboo:Bakwass123!@takeoutcluster.lcu43.mongodb.net/take_out')
    .then(()=> console.log("DB connected"));
}