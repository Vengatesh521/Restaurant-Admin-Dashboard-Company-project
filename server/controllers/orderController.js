const Order = require("../models/Order");
const Menu = require("../models/MenuItem");


// ================= GET ALL (Pagination + Filter) =================
exports.getAll = async (req, res) => {
  try {
    const { page = 1, status } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const limit = 5;
    const skip = (Number(page) - 1) * limit;

    const orders = await Order.find(filter)
      .populate("items.menuItem")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      total,
      page: Number(page),
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET SINGLE ORDER =================
exports.getOne = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.menuItem");

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= CREATE ORDER =================
exports.create = async (req, res) => {
  try {
    const { items, customerName, tableNumber } = req.body;

    // 🔥 calculate total automatically
    let totalAmount = 0;

    for (const item of items) {
      const menu = await Menu.findById(item.menuItem);

      if (!menu)
        return res.status(400).json({ message: "Invalid menu item" });

      item.price = menu.price; // auto price
      totalAmount += menu.price * item.quantity;
    }

    const order = await Order.create({
      items,
      customerName,
      tableNumber,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// ================= UPDATE STATUS =================
exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json({
      success: true,
      message: "Status updated",
      data: order,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
