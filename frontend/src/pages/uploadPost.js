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
      file: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const imageData = new FormData();
      const postData = new FormData();
      console.log(formData);
      console.log(formData.file);
      imageData.append('image', formData.file);
      axios.defaults.headers.common['Authorization'] = 'Token ' + context.key;
      let response = await axios.post('http://localhost:8000/api/images/', imageData);
      console.log(imageData)
      console.log(response.data);
      postData.append('images', response.data)
      postData.append('title', formData.title)
      postData.append('description', formData.content)
      postData.append('community', state.community)
      postData.append('user', context.username)

      response = await axios.post('http://localhost:8000/api/posts/', postData );
      console.log(response.data)

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
      {error && <p>{error}</p>}
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
        {console.log(formData)}
        <input type="file" name="file" onChange={handleFileChange} multiple/>
      </label>
      <br />
      <button type="submit">Upload Post</button>
      </form>
      </div>)

    }
