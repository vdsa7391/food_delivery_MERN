import express from "express"
import { addFood, list_food, removeFood } from "../controllers/foodController.js"
import multer from 'multer'
import foodModel from "../models/foodModel.js";


const foodRouter = express.Router();


//image storage engine
const storage= multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=> {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})


const upload = multer({storage:storage})



foodRouter.post("/add", upload.single("image"), async (req,res) =>{

    let food=null;

    if (req.file) {
        const image_filename= req.file.filename;
        food = new foodModel({
        title:req.body.title,
        description:req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename 
    })
        console.log('File uploaded:', req.file);
    } else {
        
        food= new foodModel({
        title:req.body.title,
        description:req.body.description,
        price: req.body.price,
        category: req.body.category
    })
        
        console.log('No file uploaded');
    }


    

    try {
        await food.save()
        res.json({status:true, msg:" item succefully added"})
    } catch (error) {
        console.log(error)
        res.json({status:false, msg:" Error occured while adding"})

        
    }


})

foodRouter.get("/list", list_food)
foodRouter.post("/remove",removeFood)



export default foodRouter