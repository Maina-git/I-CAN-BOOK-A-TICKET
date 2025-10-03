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
    <nav className="w-full p-5">
    <div className="p-4 w-[80%] mx-auto text-blue-400 flex justify-between items-center">
      <h1 className="font-bold text-xl">OneClickTicket</h1>
      <div className="flex gap-6">
        {user ? (
          <>
            <Link to="/" className="hover:underline">Tickets</Link>
            <Link to="/addticket">Add Ticket</Link>
            <Link to="/mytickets" className="hover:underline">My Tickets</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="font-medium">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-400 hover:bg-blue-400 px-3 py-1 rounded text-white">
              Logout
            </button>
          </>
        ) : null}
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
