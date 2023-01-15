
import {useEffect, useContext} from "react"
import { useState } from 'react';
import {Context} from '../components/sessionContext'
import Navbar from "../components/navbar"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MainCard from "../components/card"
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";

export default function Post(){
    const [data ,setData] = useState({})
    const [context, setContext] = useContext(Context)
    const id = window.location.pathname.split('/').pop()
    console.log(id)
    const [anchor, setAnchor] = useState(null)
    const isOpen = Boolean(anchor)

    const onClick = (event) =>{
        setAnchor(event.currentTarget)
    }

    const setClose = () =>{
        setAnchor(null)
    }

    useEffect(()=>{
        async function getData(id){

        axios.defaults.headers.common = "Token " + id
        try{
            const response = await axios.get('http://localhost:8000/api/posts/' + id + "/")

            console.log(response)
            console.log(response.data)
            setData(response.data)
        }catch(e){
            console.error("found error ", e)
        }

        }
        getData(id)
    }, [id])

    return(
        <div>
            <Navbar></Navbar>
            <div>
      <Button
        id="demo-positioned-button"
        aria-controls={isOpen ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={onClick}
      >
        <MoreVertIcon></MoreVertIcon>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchor}
        open={isOpen}
        onClose={setClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >

        <MenuItem onClick={setClose}>Edit post</MenuItem>
      </Menu>
    </div>
    {console.log("dataaaaaaaaaaaaa")}
    {console.log(data)}
    {data &&
    <div>
    <MainCard props={data}></MainCard>
    </div>
    }
    </div>
    )
}
