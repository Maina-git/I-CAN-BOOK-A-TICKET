import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Register</h2>
      <input className="border p-2 m-2" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 m-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 m-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 mt-2">Register</button>
    </div>
  );
};

export default Register;
