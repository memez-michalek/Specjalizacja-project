import React from "react";
import { useState, useContext } from "react";
import { Context } from "../components/sessionContext";
import Dropzone from "react-dropzone";
import { ImageUpdate } from "../components/updaters/image-updater";
import { useNavigate } from "react-router-dom";


export default function UpdateProfile(props){

    const [formData, setFormData] = useState({
        username: '',
        file: undefined,
    })
    const navigate = useNavigate()
    const [context, setContext] = useContext(Context)

    const onDrop = async (file)=>{
        const image_id = props.user.profile_picture.split('/')
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
        UpdateData.append("username", formData.username);
        UpdateData.append("profile_picture", props.user.profile_picture);
        if(formData.username === ''){
            formData.username = props.user.username
        }

        console.log(props.user)
        try{
        const response =  fetch(`http://localhost:8000/api/users/${props.user.id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${context.key}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        username: formData.username,
                        profile_picture: props.user.profile_picture
                    }
                ),
            });
        }catch(e){
            console.error(e)
        }finally{
            setContext({"username": formData.username})
            navigate("/")
        }
    }


    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={onChange}></input>
                <label>Profile Picture</label>
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
