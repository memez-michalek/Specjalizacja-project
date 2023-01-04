import react from 'react';
import { ReactDOM} from 'react';
//import Navigation from '../components/navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useContext} from "react"
import {Context} from "../components/sessionContext"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password1: '',
      password2: '',
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
        const response = await axios.post('http://localhost:8000/api/dj-rest-auth/registration/', formData);
        updateContext(response.data.key, formData.username)
        console.log(context)
        setIsLoading(false);
        navigate("/")
      } catch (error) {
        setError(error);
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
            name="password1"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="password2"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          Register
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



function RegisterForm(){
    return(
        <Form>
            <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="secondary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
export default Register
