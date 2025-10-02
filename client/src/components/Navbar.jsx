import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="font-bold text-xl">🎟 Ticket App</h1>
      <div className="flex gap-4">
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
