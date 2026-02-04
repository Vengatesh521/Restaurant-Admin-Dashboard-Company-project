import api from "../api/axios";

export default function OrderRow({ order, refresh }) {
  const update = async (e) => {
    await api.patch(`/orders/${order._id}/status`, {
      status: e.target.value,
    });
    refresh();
  };

  const badge = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Ready: "bg-green-100 text-green-700",
    Delivered: "bg-gray-200 text-gray-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-4 font-medium">{order.orderNumber.slice(0, 6)}</td>
      <td className="p-4">{order.customerName}</td>
      <td className="p-4 font-semibold">₹ {order.totalAmount}</td>

      <td className="p-4">
        <select
          value={order.status}
          onChange={update}
          className={`px-3 py-1 rounded-lg text-sm ${badge[order.status]}`}
        >
          <option>Pending</option>
          <option>Preparing</option>
          <option>Ready</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </td>
    </tr>
  );
}
  