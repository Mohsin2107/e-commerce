import express from "express";
import { createCatalog, viewOrders } from "../controllers/seller.js";
import { verifyToken, sellerOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-catalog", verifyToken, sellerOnly, createCatalog);
router.get("/orders", verifyToken, sellerOnly, viewOrders);

export default router;
