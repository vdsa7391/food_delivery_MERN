import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item


const addFood = async(req,res) =>{
    const image_filename= req.file.filename;
     
    

    const food= new foodModel({
        title:req.body.title,
        description:req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename 
    })

    try {
        await food.save()
        res.json({status:true, msg:" item succefully added"})
    } catch (error) {
        console.log(error)
        res.json({status:false, msg:" Error occured while adding"})

        
    }


}

// display food  
const list_food = async(req,res)=>{

    try {
        const foods= await foodModel.find()
        res.json({status:true, food_item: foods})
        
    } catch (error) {
        console.log(error)
        res.json({status:false, msg:"error in displaying foods"})
    }

}



//remove food item

const removeFood= async ( req,res)=>{
    try {
        const food= await foodModel.findById(req.body.id)
        console.log(food)
        fs.unlink(`uploads/${food.image}`, ()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({status: true, msg:"food_item_removed"})
        
    } catch (error) {
        console.log(error)
        res.json({status:false, msg:"error in removing food"})
        
    }

}

export {addFood, list_food, removeFood}