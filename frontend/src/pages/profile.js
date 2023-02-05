import react from 'react';
import {useEffect, useContext} from "react"
import { useState } from 'react';
import {Context} from '../components/sessionContext'
import axios from 'axios'
import Navbar from "../components/navbar"
import {FriendLoader} from "../components/loaders/friend-loader"
import AddFriend from "../components/addFriend"
import UpdateProfile from "../forms/updateProfileForm";
import { ImageLoader } from '../components/loaders/image-loader';

export default function Profile(){
    let [user, setUser] = useState({})
    const [isEdited, setIsEdited] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [context, setContext] = useContext(Context)
    console.log(context)
    console.log(context.key)
    const changeEdit = (event) => {
        event.preventDefault()
        setIsEdited(true)
    }


    const toUserId = window.location.pathname.split("/").pop()
    useEffect(() => {
        async function getUserData(id){
            let userData
          try {
            let data = id.split('/')
            //axios.defaults.headers.common['Authorization'] = 'Token ' + context.key
            userData = (await axios.get(`http://localhost:8000/api/users/${data[data.length - 1]}/`, { responseType: 'json' })).data
          } catch (err) {
            return null
          }finally{
            setUser(userData)
            setIsLoading(false)
        }
        }
        getUserData(window.location.pathname)


    },[window.location.pathname])



    if(isEdited && !isLoading){
        return(
            <UpdateProfile user={user}></UpdateProfile>
            )
    }else if(!isLoading){
        return(
            <div>
                <Navbar></Navbar>
                <button onClick={changeEdit}>Edit Profile</button>
                <ImageLoader width="300px" height="300px" images={[user.profile_picture]}></ImageLoader>
                <h1>{user.name}</h1>
                <h1>{user.username}</h1>

                <AddFriend token={context.key} username={context.username} toUserId={toUserId}></AddFriend>
                <p>friends</p>
                {user.friends ? (
                    <FriendLoader friends={user.friends} />
                ) : (
                    <p>It's quiet here at the moment.</p>
                )}
            </div>
        )
    }else{
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}
