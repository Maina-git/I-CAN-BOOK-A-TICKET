import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="flex h-screen">
      {/* Left panel */}
      <div className="w-1/2 bg-blue-500 flex flex-col items-center justify-center text-white p-10">
        <h1 className="text-5xl font-bold mb-4">OneTimeClick!</h1>
        <h2 className="text-3xl font-bold mb-4">Join Us!</h2>
        <p className="text-lg text-center max-w-md">
          Create an account to start booking tickets and enjoy a seamless experience.
        </p>
      </div>

      {/* Right panel */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-[400px] flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-blue-500 text-center">
            Register
          </h2>

          <input
            className="border p-3 rounded-lg border-blue-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-3 rounded-lg border-blue-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border p-3 rounded-lg border-blue-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-2 rounded-lg"
          >
            Register
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
