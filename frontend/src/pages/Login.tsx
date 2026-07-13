import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../api/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        name: "",
        email,
        password
      });

      if (res.data.success) {

        localStorage.setItem("user", JSON.stringify(res.data));

        alert("Login Successful");

        navigate("/dashboard");

      } else {

        alert(res.data.message);

      }

    } catch (err) {

      console.log(err);

      alert("Server Error");

    }

  };

  return (

    <Layout>

      <div className="flex justify-center py-20 bg-gray-100">

        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-blue-700">
            Login
          </h1>

          <form onSubmit={loginUser} className="mt-8 space-y-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <button className="w-full bg-blue-700 text-white py-3 rounded-lg">
              Login
            </button>

          </form>

          <p className="mt-6 text-center">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-700 ml-2 font-bold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </Layout>

  );

}

export default Login;