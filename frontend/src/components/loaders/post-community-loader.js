import React from "react"
import {useState} from "react"
import {useEffect} from "react"
import axios from 'axios'
import { Link } from 'react-router-dom';


function LoadCommunity(props){
    let [community, setCommunity] = useState(Object)

    useEffect(() => {
        async function loadCommunity(id){
            let community;
            try{
                community = (await axios.get(`${id}`, { responseType: 'json' })).data
            }catch(error){
                return null
        }
        setCommunity(community)
    }

        loadCommunity(props.props)
    },[props.props])



    return(
        <div>
            <Link to={"community/" + community.id}>Uploaded to {community.name}</Link>
        </div>
    )
}
export {LoadCommunity}
