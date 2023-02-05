import React, { useState, useContext, useEffect, useCallback } from 'react';
import {Context} from "../components/sessionContext"
import { useLocation, useNavigate } from 'react-router-dom';
import { ImageUpdate } from '../components/updaters/image-updater';
import { imageUploader } from "../components/uploaders/image-uploader";
import Dropzone from "react-dropzone";

export default  function UpdatePost (props) {
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
  let imported_image_ids = props.image_ids

  const handleChange = useCallback((event) => {
    console.log(event.target.value)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }, [formData]);

  /*
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };*/

  /*
  const handleFileChange = (event) => {
    console.log(event.target.value)
    setFormData({
      ...formData,
      file: [...event.target.files],
    });
  };*/

    console.log(props)
    const onDrop = async (acceptedFiles) => {
        console.log(acceptedFiles)
        const delta = acceptedFiles.length - imported_image_ids.length
        console.log(delta)
        if(delta > 0){

          imageUploader(acceptedFiles.slice(-delta), context.key)
          .then(data=>{
            console.log(data)
          if (data && data.length > 0) {
            console.log(data.id)
            //imported_image_ids.push(data)
            acceptedFiles.splice(acceptedFiles.length - delta, delta);
            ImageUpdate(acceptedFiles, imported_image_ids, context.key);
            for (let obj of data){
              imported_image_ids.push(obj.id)
            }
            console.log(imported_image_ids)
          }
            /*imageUploader(acceptedFiles.slice(-delta), context.key)
            .then(uploadedImageIds =>{
              acceptedFiles.splice(acceptedFiles.length - delta, delta)
              ImageUpdate(acceptedFiles, image_ids, context.key)
              if (uploadedImageIds && uploadedImageIds.length > 0) {
                image_ids.push(uploadedImageIds);
              }
            })
            */
          })
        }else if(acceptedFiles.length === imported_image_ids.length){

            console.log("updates" + ImageUpdate(acceptedFiles, imported_image_ids, context.key))
        }else{

        }
        console.log(acceptedFiles);
        console.log(imported_image_ids)
      }


  const handleSubmit = useCallback((event) => {
    console.log("called submit")
    event.preventDefault();
    setIsLoading(true);
    setError('');
    /*
    const postData = new FormData();
    postData.append('title', formData.title)
    postData.append('description', formData.content)
    for(id of props.image_ids){
      postData.append('images', id)
    }
    */

    //postData.append('images', '')
    console.log("image ids + " + imported_image_ids)

    try{
      let image_urls = []
      console.log(imported_image_ids)
      for(let image_id of imported_image_ids){
        image_urls.push("http://localhost:8000/api/images/" + image_id + "/")
      }

      console.log(image_urls)
      if(formData.title === ''){
        formData.title = props.title
      }
      fetch(`http://localhost:8000/api/posts/${props.id}/`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + context.key
        },
        body: JSON.stringify(
          {
            title: formData.title,
            description: formData.content,
            images: image_urls,
          }
        )
      }).then(response => response.json())
      .then(data=>{
        console.log(data)
        navigate("/")
      })


      //const response = await axios.put(`http://localhost:8000/api/posts/${props.id}/`, formData)
    }catch(e){
      console.error(e)
    }finally{
      setIsLoading(false)
      //navigate("/")
    }
  },[formData,imported_image_ids, context.key, props.id]);

  /*
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const postData = new FormData();
    postData.append('title', formData.title)
    postData.append('description', formData.content)
    //postData.append('images', '')
    try{
      fetch(`http://localhost:8000/api/posts/${props.id}/`, {
        method: 'PATCH',
        headers:{    console.log(props.imported_image_ids)
          {
            title: formData.title,
            description: formData.content,
          }
        )
      })


      //const response = await axios.put(`http://localhost:8000/api/posts/${props.id}/`, formData)
    }catch(e){
      console.error(e)
    }finally{
      setIsLoading(false)
      //navigate("/")
    }
    /*




      /*const postData = new FormData();
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
          method: 'PUT',
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



      })*/

  if(!isLoading){
    return (

    <div>
    {/*
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
        </label>
        {console.log(context.key)}
        </form>
  */}


<form onSubmit={handleSubmit}>
      <label>
        Title:

        <input
          type="text"
          name="title"
          value={formData.title}
          {...console.log(handleChange)}
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
        </label>
        {console.log(context.key)}
        <Dropzone onDrop={onDrop}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              Click me to upload a file!
            </div>
          )}
        </Dropzone>

        <br />

      <button type="submit">Update post</button>
      </form>

      </div>
      )
          }
}
