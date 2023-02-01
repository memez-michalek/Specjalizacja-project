import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {Context} from "../components/sessionContext"
import { useLocation, useNavigate } from 'react-router-dom';
import { imageUploader } from '../components/uploaders/image-uploader';

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

      const postData = new FormData();
      postData.append('title', formData.title)
      postData.append('description', formData.content)
      postData.append('community', state.community)
      postData.append('user', context.username)
      console.log(formData);
      if (formData.file){
      imageUploader(formData.file, context.key).then(res=>{
        for(let img of res){
          postData.append('images', img);
        }

      }).catch(error=>{console.log(error)}).then(()=>{
        try{
        fetch('http://localhost:8000/api/posts/',{
          method: 'POST',
          headers: {
            'Authorization': 'Token ' + context.key,
          },
          body: postData,



        }).then(()=>{
          navigate('/')
        })

      }catch(e){
          console.error(e)
        } finally {
          setIsLoading(false);
        }



      })
  }}

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
      </div>
      )

  }
