const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const schema = new mongoose.Schema(
  {
    orderNumber: { type: String, default: () => uuid() },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending",
    },
    customerName: String,
    tableNumber: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", schema);
