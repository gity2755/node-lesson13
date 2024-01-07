import mongoose from "mongoose";
const castoumerSchema=mongoose.Schema({
    tz: {type:Number,required:true},
    name: Number,
   startYear:Number
})
export const castoumerModel=mongoose.model("castoumers",castoumerSchema);



