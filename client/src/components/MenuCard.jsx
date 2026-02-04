import api from "../api/axios";

export default function MenuCard({ item, refresh }) {
  const toggle = async () => {
    item.isAvailable = !item.isAvailable;
    refresh();
    await api.patch(`/menu/${item._id}/availability`);
  };

  const remove = async () => {
    await api.delete(`/menu/${item._id}`);
    refresh();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>

      <p className="text-gray-500 text-sm mb-2">{item.category}</p>

      <p className="font-bold text-black text-lg mb-4">₹ {item.price}</p>

      <span
        className={`inline-block text-xs px-3 py-1 rounded-full mb-4 ${
          item.isAvailable
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {item.isAvailable ? "Available" : "Unavailable"}
      </span>

      <div className="flex gap-3">
        <button
          onClick={toggle}
          className="flex-1 bg-black text-white py-2 rounded-lg hover:opacity-80"
        >
          Toggle
        </button>

        <button
          onClick={remove}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
