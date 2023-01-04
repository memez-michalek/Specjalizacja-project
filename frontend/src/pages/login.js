import React, { useState, useContext } from 'react';
import axios from 'axios';
import {Context} from "../components/sessionContext"
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [context, updateContext] = useContext(Context);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/dj-rest-auth/login/', formData);
      updateContext({"key" : response.data.key, "username" : formData.username})
      console.log(context)
      setIsLoading(false);
      navigate("/")
    } catch (error) {
      setError('Incorrect username or password');
      setIsLoading(false);

    }
  };
  if(typeof(context) !== "string"){
  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );}else{
    return  (
      <div>
        <p>you are already logged in</p>
      <button onClick={()=>{navigate("/")}}>Go to main page</button>
      </div>
    )
  }
};

export default LoginForm;
