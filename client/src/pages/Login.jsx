import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Login = ({toAuth}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toAuth();
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Login</h2>
      <input className="border p-2 m-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 m-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 mt-2">Login</button>
    <div>
      <span>Dont have an account <Link href="/register">Register</Link></span>
    </div>
     </div>
  );
};

export default Login;
