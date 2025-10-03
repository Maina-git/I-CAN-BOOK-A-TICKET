import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ toAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (toAuth) toAuth();
         navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-500 flex flex-col items-center justify-center text-white p-10">
        <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg text-center max-w-md">
          Log in to continue booking tickets and manage your reservations easily.
        </p>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-[400px] flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-blue-500 text-center">
            Login
          </h2>
          <input
            className="border p-3 rounded-lg border-blue-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <input
            className="border p-3 rounded-lg border-blue-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-2 rounded-lg">
            Login
          </button>
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
