import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {Context} from "../components/sessionContext"
import { useLocation, useNavigate } from 'react-router-dom';

export default function PostForm (props) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    file: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);
  const {state} = useLocation();
  const [error, setError] = useState('');
  const [context, updateContext] = useContext(Context);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      file: [...event.target.files],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const imageData = new FormData();
      const postData = new FormData();

      for(let img of formData.file){
        imageData.append('image', img);
      }
      axios.defaults.headers.common['Authorization'] = 'Token ' + context.key;
      let response = await axios.post('http://localhost:8000/api/images/', imageData);

      for(let img of response.data){
        postData.append('images', img);
      }
      postData.append('title', formData.title)
      postData.append('description', formData.content)
      postData.append('community', state.community)
      postData.append('user', context.username)

      response = await axios.post('http://localhost:8000/api/posts/', postData );
      navigate("/")
    } catch (error) {
      setError(error.message);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Content:
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        File:
        <input type="file" name="file" onChange={handleFileChange} multiple/>
      </label>
      <br />
      <button type="submit">Upload Post</button>
      </form>
      </div>)

    }
