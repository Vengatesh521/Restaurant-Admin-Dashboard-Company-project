import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/api/orders").then((r) => setOrders(r.data));
  }, []);

  return (
    <div>
      {orders.map((o) => (
        <div key={o._id}>
          {o.orderNumber} - {o.status}
        </div>
      ))}
    </div>
  );
}
