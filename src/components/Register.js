import React, { useState } from "react";
import axios from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
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

  console.log(formData);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/auth/register", formData);
    console.log(response?.data);
    console.log(response?.accessToken);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          name="firstName"
          required
          onChange={handelInputChange}
          placeholder="First name"
        />
        <input
          type="text"
          name="lastName"
          required
          onChange={handelInputChange}
          placeholder="Last name"
        />
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

export default Register;
