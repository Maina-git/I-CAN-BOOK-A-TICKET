import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AddTicket from "./pages/app/AddTicket";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tickets from "./pages/app/Tickets";
//import MyTickets from "./pages/app/MyTickets";

const App = () => {
  const token = localStorage.getItem("token");
  const [auth, setAuth] = useState(!!token);

  function toAuth() {
    setAuth(true); // set logged in after successful login
  }

  return (
    <BrowserRouter>
      <Layout auth={auth}>
        <Routes>
          <Route path="/login" element={<Login toAuth={toAuth} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={auth ? <Tickets /> : <Navigate to="/login" />}/>
          <Route
          path="addticket"
          element={auth ? <AddTicket/> : <Navigate to="/login"/> }/>
          <Route path="*" element={<Navigate to={auth ? "/" : "/login"} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

// Layout wrapper: Navbar only shows when logged in, not on login/register
const Layout = ({ auth, children }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {auth && !hideNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default App;
