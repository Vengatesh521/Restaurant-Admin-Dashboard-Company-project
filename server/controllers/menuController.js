const Menu = require("../models/MenuItem");

// ================= GET ALL =================
exports.getAll = async (req, res) => {
  try {
    const { category, available, min, max } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (available) filter.isAvailable = available === "true";

    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }

    const data = await Menu.find(filter);

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= SEARCH =================
exports.search = async (req, res) => {
  try {
    const q = req.query.q || "";

    const data = await Menu.find({
      $text: { $search: q },
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET ONE =================
exports.getOne = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Menu item not found" });

    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CREATE =================
exports.create = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menu,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= UPDATE =================
exports.update = async (req, res) => {
  try {
    const item = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ message: "Menu item not found" });

    res.json({
      success: true,
      message: "Updated successfully",
      data: item,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.delete = async (req, res) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);

    if (!item) return res.status(404).json({ message: "Menu item not found" });

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= TOGGLE =================
exports.toggle = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Menu item not found" });

    item.isAvailable = !item.isAvailable;

    await item.save();

    res.json({
      success: true,
      message: "Availability toggled",
      data: item,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
