import React from "react";
import { useState, useContext } from "react";
import { Context } from "../components/sessionContext";
import Dropzone from "react-dropzone";
import { ImageUpdate } from "../components/updaters/image-updater";
import { useNavigate } from "react-router-dom";


export default function UpdateCommunity(props){

    const [formData, setFormData] = useState({
        name: '',
        bio: '',
    })
    const navigate = useNavigate()
    const [context, setContext] = useContext(Context)

    const onDrop = async (file)=>{
        const image_id = props.community.background_image.split('/')
        ImageUpdate(file, [image_id[image_id.length - 2]], context.key)
    }

    const onChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        }, [formData])
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let UpdateData = new FormData()
        UpdateData.append("name", formData.name);
        UpdateData.append("bio", formData.bio);

        if(formData.name === ''){
            formData.name = props.community.name
        }

        console.log(props.community)
        try{
        const response =  fetch(`http://localhost:8000/api/community/${props.community.id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${context.key}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: formData.name,
                        bio: formData.bio,
                        profile_picture: props.community.background_image
                    }
                ),
            });
        }catch(e){
            console.error(e)
        }finally{
            //navigate("/")
        }
    }


    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={onChange}></input>
                <label>Bio</label>
                <input type="text" name="bio" value={formData.bio} onChange={onChange}></input>
                <label>Background Image</label>
                <Dropzone onDrop={onDrop}>
                    {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    Click me to upload a file!
                    </div>
                )}
        </Dropzone>
                <input type="submit"></input>
            </form>
        </div>
    )
}
