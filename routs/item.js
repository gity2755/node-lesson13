import express from "express";

import * as itemController from "../Controllers/item.js";

const router = express.Router();

router.get("/", itemController.getAllItem)
router.get("/:bookid", itemController.getItemById)
router.delete("/:id", itemController.deleteItemById)
router.post("/", itemController.addItem)
router.put("/:id", itemController.updateItem)

export default router;
