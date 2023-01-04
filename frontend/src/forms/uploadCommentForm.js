import React from "react"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { Context } from "../components/sessionContext"
import { useContext } from "react"
import axios from "axios"

export function CreateComment(props){
    const [formData, setFormData] = useState({
        comment: ''
    })
    const [context, updateContext] =  useContext(Context)

    const handleChange = (event) =>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const packagedForm = new FormData();
        packagedForm.append('text', formData.comment)
        packagedForm.append('user', context.username)
        console.log(context.username)
        packagedForm.append('community', props.community)
        console.log(props.community)
        console.log(packagedForm)
        try{

        let response = await axios.post('http://localhost:8000/api/comments/', packagedForm);

        console.log(response.data)
        }catch(err){
           console.log(err)
        }
    }

    return(

        <div>
            {console.log(formData)}
            <form onSubmit={handleSubmit}>
            <label>
                Comment:
                </label>
                <input
                    type="text"
                    name="comment"
                    value={formData.title}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}
