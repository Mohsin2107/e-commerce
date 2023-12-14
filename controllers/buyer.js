import Catalog from "../models/Catalog.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const viewCatalog = async (req, res) => {
  try {
    const seller = req.params.seller_id;
    const catalog = await Catalog.findOne({ seller: seller }).populate({
      path: "products",
      model: "Product",
      select: "name price",
    });
    const products = catalog.products;
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const sellerList = async (req, res) => {
  try {
    const sellers = await User.find({ userType: "seller" });
    res.status(200).json(sellers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createOrder = async (req, res) => {
  const { seller_id } = req.params;
  const buyer_id = req.user.id;
  const { products } = req.body;
  try {
    const productsFound = await Product.find({
      name: { $in: products },
    });
    const productIds = productsFound.map((product) => product._id);
    const order = new Order({
      buyer: buyer_id,
      seller: seller_id,
      products: productIds,
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
