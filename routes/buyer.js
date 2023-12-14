import express from "express";
import { sellerList, viewCatalog, createOrder } from "../controllers/buyer.js";
import { verifyToken, buyerOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/list-of-sellers", verifyToken, buyerOnly, sellerList);
router.get("/seller-catalog/:seller_id", verifyToken, buyerOnly, viewCatalog);
router.post("/create-order/:seller_id", verifyToken, buyerOnly, createOrder);

export default router;
