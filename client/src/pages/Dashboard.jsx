import useFetch from "../hooks/useFetch";
import OrderRow from "../components/OrderRow";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { data, loading, refetch } = useFetch("/orders");

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🧾 Orders Dashboard</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((o) => (
              <OrderRow key={o._id} order={o} refresh={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
