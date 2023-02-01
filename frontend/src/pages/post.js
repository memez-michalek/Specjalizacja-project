
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
import UpdatePost from "../forms/updatePostForm";
import GetIds from "../helpers/idGetter";
import { useNavigate } from "react-router-dom";

export default function Post(){
    const [data ,setData] = useState([])
    const [context, setContext] = useContext(Context)
    const id = window.location.pathname.split('/').pop()

    const [isLoading, changeLoadingState] = useState(true);
    const [anchor, setAnchor] = useState(null)
    const isOpen = Boolean(anchor)
    const [isEdited, changeEditState] = useState(false)
    const navigate = useNavigate("/")

    const onClick = (event) =>{
        event.preventDefault()
        setAnchor(event.currentTarget)
    }

    const editPost = (event) =>{
      event.preventDefault()
      setAnchor(null)
      changeEditState(true)
    }

    const deletePost = async (event)=>{
      event.preventDefault()
      console.log(context.key)
      console.log(id)
      try{
      fetch(`http://localhost:8000/api/posts/${id}/`,{
        method: "DELETE",
        headers: {
          "Authorization": "Token " + context.key
        }
      })
      .then(()=>{
        navigate("/")
      })
      }catch(e){
        console.error(e)
      }
      /*
      try{
      const response = await axios.delete(`http://localhost:8000/api/posts/${id}/`)
      if(response.status === 200){
        navigate("/")
        // axios.defaults.headers.common = `Token ${context.key}`
      }
      }catch(e){
        console.error("error has been found", e)
      }
      */
    }

    useEffect(()=>{
        async function getData(id){

        axios.defaults.headers.common = `Token ${context.key}`
        try{
            const response = await axios.get('http://localhost:8000/api/posts/' + id + "/")
            setData(response.data)
            changeLoadingState(false)
        }catch(e){
            console.error("found error ", e)
        }

        }
        getData(id)
    }, [id])




    if(!isLoading){
      console.log(data.images)
      const image_ids = GetIds(data.images)
      console.log(image_ids)

    if(isEdited){
      return(
        <div>
          {console.log(context.key)}
          <UpdatePost image_ids={image_ids} id={id} title={data.title} files={data.images} key={context.key}></UpdatePost>
        </div>
      )



    }else{

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
        onClose={editPost}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >

        <MenuItem onClick={editPost}>Edit post</MenuItem>
        <MenuItem onClick={deletePost}>Delete post</MenuItem>
      </Menu>
    </div>

    <div>
    <MainCard post={data}></MainCard>
    </div>

    </div>
    )
      }
  }else{
    <p>Loading</p>
  }
}
