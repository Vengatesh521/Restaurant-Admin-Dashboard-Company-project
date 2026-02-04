import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg ${
      pathname === path
        ? "bg-white text-black font-semibold"
        : "hover:bg-gray-700"
    }`;

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold tracking-wide">🍽 Restaurant Admin</h1>

        <div className="flex gap-4">
          <Link to="/" className={linkStyle("/")}>
            Menu
          </Link>
          <Link to="/orders" className={linkStyle("/orders")}>
            Orders
          </Link>
        </div>
      </div>
    </nav>
  );
}
