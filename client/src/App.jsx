import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tickets from "./pages/Tickets";
import { useState } from "react";


const App = () => {
  const token = localStorage.getItem("token");

  const [auth, setAuth] = useState(false);

  function toAuth(){
    setAuth(prev=>!prev)
  }

if(!auth) return <Login toAuth={toAuth}/>  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        { /* <Route path="/" element={<Navigate to="/tickets" />}  /> */}
       <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/" element={token ? <Tickets /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
