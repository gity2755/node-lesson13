import express from "express";

import * as castoumerController from "../Controllers/castoumer.js";

const router = express.Router();

router.get("/", castoumerController.getAllCastoumer)
router.get("/:itemid", castoumerController.getCastoumerById)
router.delete("/:id", castoumerController.deleteCastoumerById)
router.post("/", castoumerController.addCastoumer)
router.put("/:id", castoumerController.updateCastoumer)

export default router;
