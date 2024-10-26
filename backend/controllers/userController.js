import userModel from "../models/model_user.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'


const createToken= (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}
// login user
 const login_user = async( req,res)=>{
    const {user_id, password} = req.body;
    try {
        const user = await userModel.findOne({user_id})
        if(!user){
            return res.json({success:false, msg:"USER DOESN'T EXIST"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, msg:"wrong credentials"});
        }

        const token = createToken(user._id);
        res.json({success:true, msg:"User succefully login", token});

    } catch (error) {
        console.log(error)
        res.json({success:false, msg:"can't login"});

        
    }


 }


 // register user


 const register_user = async( req,res)=>{
    const{user_id, password, dob} = req.body;
    try {
        const exists= await userModel.findOne({user_id})
        if(exists){
            return res.json({success: false, msg:"user already exists"});
        }
        if(password.length < 8){
            return res.json({success: false, msg:"enter a strong password"});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            user_id: user_id,
            password:hashedpassword,
            dob:dob
        })

        const u= await newUser.save()
        const token = createToken(u._id)
        
        res.json({success:true, mes:"user added", token});

    } catch (error) {
        console.log(error)
        res.json({success:false, mes:"user not added"});

    }

 }


 export {login_user, register_user}
