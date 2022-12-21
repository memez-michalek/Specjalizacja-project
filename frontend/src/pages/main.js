import React from 'react'
import { useEffect } from "react"
import Navbar from "../components/navbar"
import MainCard from '../components/card'

function Main(){
    const [data, setData] = React.useState([])

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

    return(
        <div>
            <Navbar></Navbar>
            {data.map(post=>(
                <div>
                <MainCard props={post}></MainCard>
                </div>
            ))}
        </div>
    )
}

export default Main
