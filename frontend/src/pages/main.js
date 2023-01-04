import React from 'react'
import { useEffect, useContext } from "react"
import Navbar from "../components/navbar"
import MainCard from '../components/card'
import {Context} from "../components/sessionContext"

import { Link } from 'react-router-dom'

const Main = () =>{
    const [data, setData] = React.useState([])
    const [context, setContext] = useContext(Context)
    useEffect(()=>{
        fetch('http://localhost:8000/api/posts/')
        .then(res => res.json())
        .then((result)=>{
            setData(result)
        })
        .catch(error=>{
            console.error("found error ", error)
        })
    }, [])

    console.log(typeof(context))
    console.log(context)
    if (typeof(context.key) !== "string" || context.key ==="") {
        {console.log(context)}
        return (<div><p>Please log in or register to view this content.</p>
        <Link to="/login">Please log in</Link>
        <Link to="/register">Please register</Link></div>)
    }else{


    return(
        <div>
            <Navbar></Navbar>
            {console.log(context)}
            {data.map(post=>(
                <div>
                <MainCard props={post}></MainCard>
                </div>
            ))}
        </div>
    )
    }
}


export default Main;
