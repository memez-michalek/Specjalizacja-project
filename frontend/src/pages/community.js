import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from '../components/card';
import {ImageLoader} from '../components/loaders/image-loader';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import UpdateCommunity from '../forms/updateCommunityForm';

export default function Community(){
    let splitted = window.location.pathname.split('/');
    let url = splitted[splitted.length - 1];
    let [data, setData] = useState({})
    let navigate = useNavigate()
    const [isEdited, changeIsEdited] = useState(false)

    const editCommunity = (e) =>{
        e.preventDefault()
        changeIsEdited(true)
    }

    async function loadCommunity(id){
        let values;
        try{
            values = (await axios.get(`http://localhost:8000/api/community/${id}/`, { responseType: 'json' })).data
            console.log(values);
        }catch(error){
            console.debug(error)
        }
        setData((prevData) => ({ ...prevData, ...values }))
    }


    useEffect(() => {
        loadCommunity(url)
    }, [])



    if(isEdited){
        return(
            <UpdateCommunity community={data}></UpdateCommunity>
        )
    }else{
    return (
        <div>
            <Navbar></Navbar>
            <h1>{data.name}</h1>
            <p>{data.bio}</p>
            {/*
            <Link to={{pathname: "/upload",  state: { community: data.id}}}>Add post</Link>
    */}

            <button onClick={editCommunity}>Edit community</button>
            <button
                title="Done"
                onClick={() => {
                    navigate("/upload_post", { state : {community: data.id}})

        }}>Add Post</button>


            {data.background_image ? <ImageLoader images={[data.background_image]}></ImageLoader> : <p>community image</p>}
            {data.community && data.community.map(post => (
                <div>
                    <MainCard post={post} />
                </div>
            ))}
        </div>
      );
        }
    }
