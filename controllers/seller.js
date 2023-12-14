import Catalog from "../models/Catalog.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createCatalog = async (req, res) => {
  const seller_id = req.user.id;
  const { items } = req.body;
  try {
    const productPromises = items.map(async (item) => {
      const { name, price } = item;
      const product = new Product({ name, price });

      await product.save();
      return product._id;
    });

    const productIds = await Promise.all(productPromises);
    let catalog = await Catalog.findOne({ seller: seller_id });

    if (!catalog) {
      catalog = new Catalog({
        seller: seller_id,
        products: productIds,
      });

      await catalog.save();
    } else {
      catalog.products.push(...productIds);
      await catalog.save();
    }

    res.status(201).json(catalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewOrders = async (req, res) => {
  const seller_id = req.user.id;
  try {
    const orders = await Order.find({ seller: seller_id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
