import React, { useState } from "react";
import axios from "../api/axios";

import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handelInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", formData);
      console.log(response?.data);
      setAuth(response?.data);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handelSubmit}>
        <input
          type="email"
          name="email"
          required
          onChange={handelInputChange}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          required
          onChange={handelInputChange}
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
