import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../api/api";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const registerUser = async (e: React.FormEvent) => {

    e.preventDefault();

    try{

      const res = await API.post("/auth/register", user);

      if(res.data.success){

        alert("Registration Successful");

        navigate("/login");

      }else{

        alert(res.data.message);

      }

    }catch(err){

      console.log(err);

      alert("Server Error");

    }

  };

  return(

    <Layout>

      <div className="flex justify-center py-20 bg-gray-100">

        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-green-700">

            Register

          </h1>

          <form
            onSubmit={registerUser}
            className="mt-8 space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
              required
            />

            <button
              className="w-full bg-green-700 text-white py-3 rounded-lg"
            >

              Register

            </button>

          </form>

          <p className="mt-6 text-center">

            Already have an account?

            <Link
              to="/login"
              className="text-green-700 ml-2 font-bold"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </Layout>

  );

}

export default Register;