import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from '../components/card';
import {ImageLoader} from '../components/loaders/image-loader';
import Navbar from '../components/navbar';

export default function Community(){
    let splitted = window.location.pathname.split('/');
    let url = splitted[splitted.length - 1];
    let [data, setData] = useState({})

    async function loadCommunity(id){
        let values;
        try{
            values = (await axios.get(`http://localhost:8000/api/community/${id}/`, { responseType: 'json' })).data
        }catch(error){
            console.debug(error)
        }
        setData((prevData) => ({ ...prevData, ...values }))
    }


    useEffect(() => {
        loadCommunity(url)
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <h1>{data.name}</h1>
            <p>{data.bio}</p>
            {data.background_image ? <ImageLoader images={[data.background_image]}></ImageLoader> : <p>community image</p>}
            {data.community && data.community.map((post) => (
                <div>
                    <MainCard props={post} />
                </div>
            ))}
        </div>
      );
    }
