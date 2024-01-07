import mongoose from "mongoose";
import { castoumerModel } from "../Model/castoumer.js";
const getAllCastoumer = async (req, res) => {
    try {
        let allCastoumers = await castoumerModel.find({});
        res.json(allCastoumers);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפתהנתונים " + er.message)
    }
}

const getCastoumerById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.castoumerid))
            return res.status(400).send("קוד לא תקין")
        let castoumer = await castoumerModel.findById(req.params.castoumerid);
        if (!castoumer)
            return res.status(404).send("מצטערים לא נמצא מוצר עם כזה קוד")
        res.json(castoumer);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפת הנתונים " + er.message)
    }
}

const deleteCastoumerById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let castoumer = await castoumerModel.findByIdAndDelete(id);
        if (!castoumer)
            return res.status(404).send("מצטערים לא נמצא מוצר עם כזה קוד")
        res.json(book);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפת הנתונים " + er.message)
    }
}


const updateCastoumer = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let castoumerToUpdate = await castoumerModel.findById(id);
        if (!castoumerToUpdate)
            return res.status(404).send("  מצטערים לא נמצא מוצר עם כזה קוד")
        res.json(book);


        await castoumerModel.findByIdAndUpdate(id, req.body);
        let castoumer = await castoumerModel.findById(id)
        res.json(castoumer);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפת הנתונים " + er.message)
    }
}

const addCastoumer= async (req, res) => {
    let { tz, name, startYear } = req.body;
    if (!tz || !name) {
        return res.status(404).send("שם ומחיר הם חובה")
    }
    try {
        let sameCastoumer = await castoumerModel.find({ tz, name, startYear });
        if (sameCastoumer.length > 0)
            return res.status(409).send("כבר קיים מוצר עם שם ומחיר כזה")
        let newCastoumer=new castoumerModel({ tz, name, startYear });
        await newCastoumer.save();
        res.json(newCastoumer);
    }
    catch (er) {
        res.status(400).send("מצטערים הרחשה שגאה בשליפת הנתונים " + er.message)
    }
}
export {getAllCastoumer,getCastoumerById,deleteCastoumerById,updateCastoumer,addCastoumer};

