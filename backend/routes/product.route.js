import express from 'express';
import { handleAddProducts, handleGetProductById, handleGetProducts, handleRemoveProducts, handleUpdateProducts } from '../controllers/product.controller.js';
import { protectRoute, adminOnly } from '../middlewares/user.middleware.js';
const router = express.Router();



router.get("/",handleGetProducts);
router.get("/:id", handleGetProductById);
router.post("/addproducts", protectRoute, adminOnly, handleAddProducts);
router.delete("/removeproducts/:id", protectRoute, adminOnly, handleRemoveProducts);
router.put("/updateproducts/:id", protectRoute, adminOnly, handleUpdateProducts);

export default router;
