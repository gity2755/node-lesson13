import mongoose from "mongoose";
const itemSchema=mongoose.Schema({
    name: {type:String,required:true},
    price: Number,
    section:mongoose.Schema({
        sectioName:String,
        sectioId:Number
    })
})
export const itemModel=mongoose.model("items",itemSchema);



