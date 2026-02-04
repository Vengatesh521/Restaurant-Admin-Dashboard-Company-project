import { useState, useEffect } from "react";
import api from "../api/axios";
import useDebounce from "../hooks/useDebounce";
import MenuCard from "../components/MenuCard";
import Loader from "../components/Loader";

export default function MenuManagement() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);

  const fetchMenu = async () => {
    const res = debounced
      ? await api.get(`/menu/search?q=${debounced}`)
      : await api.get("/menu");

    setMenu(res.data.data || res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, [debounced]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📋 Menu Management</h2>

      <input
        className="w-full md:w-96 border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-black mb-6"
        placeholder="Search food or ingredients..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {menu.length === 0 ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menu.map((item) => (
            <MenuCard key={item._id} item={item} refresh={fetchMenu} />
          ))}
        </div>
      )}
    </div>
  );
}
