import { useState, useContext } from "react"
import React from "react";
import axios from "axios";
import { imageUploader } from "../components/uploaders/image-uploader";
import { Context } from "../components/sessionContext";
import { useNavigate } from "react-router-dom";


export default function CommunityForm(){
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        file: undefined,
    })
    const [isLoading, setIsLoading] = useState(false);
    const [context, updateContext] = useContext(Context)
    const [image, setImage] = useState(undefined);
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

    const onSubmit = async(e)=>{
        e.preventDefault()
        setIsLoading(true);




        CommunityForm = new FormData();
        CommunityForm.append('name', formData.name)
        CommunityForm.append('bio', formData.bio)
        try{
            imageUploader(formData.file, context.key).then(res=>{
              CommunityForm.append('background_image', res[0].id)
            }).then(()=>{
              fetch('http://localhost:8000/api/community/',{
                method: 'POST',
                headers: {
                  'Authorization': 'Token ' + context.key
                },
                body: CommunityForm,
                credentials: 'include'
              })

            }).then(res=>{
              console.log(res)
            })

        }catch(err){
            console.debug(err)
        }finally {
            setIsLoading(false);
            navigate("/")
          }
    }

    return(
        <div>
        <form onSubmit={onSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Bio:</label>
        <input type="text" name="bio" value={formData.bio} onChange={handleChange} />
        <label>Background Image:
        <input type="file" name="file" onChange={handleFileChange} />
      </label>
        <button type="submit">Submit</button>
      </form>
    </div>
    )
}
