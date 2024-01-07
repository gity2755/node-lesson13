import mongoose from "mongoose";
import { itemModel } from "../Model/item.js";
const getAllItem = async (req, res) => {
    try {
        let allItems = await itemModel.find({});
        res.json(allItems);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפתהנתונים " + er.message)
    }
}

const getItemById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.itemid))
            return res.status(400).send("קוד לא תקין")
        let item = await itemModel.findById(req.params.itemid);
        if (!item)
            return res.status(404).send("מצטערים לא נמצא מוצר עם כזה קוד")
        res.json(book);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפת הנתונים " + er.message)
    }
}

const deleteItemById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let item = await itemModel.findByIdAndDelete(id);
        if (!item)
            return res.status(404).send("מצטערים לא נמצא מוצר עם כזה קוד")
        res.json(book);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפת הנתונים " + er.message)
    }
}


const updateItem = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let itemToUpdate = await itemModel.findById(id);
        if (!itemToUpdate)
            return res.status(404).send("  מצטערים לא נמצא מוצר עם כזה קוד")
        res.json(book);


        await itemModel.findByIdAndUpdate(id, req.body);
        let item = await itemModel.findById(id)
        res.json(item);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפת הנתונים " + er.message)
    }
}

const addItem = async (req, res) => {
    let { name, price, section } = req.body;
    if (!name || !price) {
        return res.status(404).send("שם ומחיר הם חובה")
    }
    try {
        let sameItem = await itemModel.find({ name, price, section });
        if (sameItem.length > 0)
            return res.status(409).send("כבר קיים מוצר עם שם ומחיר כזה")
        let newItem=new itemModel({ name, price, section });
        await newItem.save();
        res.json(newItem);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפת הנתונים " + er.message)
    }
}
export {getAllItem,getItemById,deleteItemById,updateItem,addItem};

