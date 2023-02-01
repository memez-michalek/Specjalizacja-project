
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

export default function Post(){
    const [data ,setData] = useState([])
    const [context, setContext] = useContext(Context)
    const id = window.location.pathname.split('/').pop()

    const [isLoading, changeLoadingState] = useState(true);
    const [anchor, setAnchor] = useState(null)
    const isOpen = Boolean(anchor)
    const [isEdited, changeEditState] = useState(false)

    const onClick = (event) =>{
        setAnchor(event.currentTarget)
    }

    const editPost = () =>{
      setAnchor(null)
      changeEditState(true)


    }


    useEffect(()=>{
        async function getData(id){

        axios.defaults.headers.common = "Token " + id
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
