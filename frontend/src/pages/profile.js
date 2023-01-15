import react from 'react';
import {useEffect, useContext} from "react"
import { useState } from 'react';
import {Context} from '../components/sessionContext'
import axios from 'axios'
import Navbar from "../components/navbar"
import {FriendLoader} from "../components/loaders/friend-loader"
import AddFriend from "../components/addFriend"


export default function Profile(){
    let [user, setUser] = useState({})
    const [context, setContext] = useContext(Context)
    console.log(context)
    console.log(context.key)
    const toUserId = window.location.pathname.split("/").pop()
    useEffect(() => {
        async function getUserData(id){
            let userData
          try {
            let data = id.split('/')
            axios.defaults.headers.common['Authorization'] = 'Token ' + context.key
            userData = (await axios.get(`https://dev.local/api/users/${data[data.length - 1]}/`, { responseType: 'json' })).data
          } catch (err) {
            return null
          }
          setUser(userData)
        }
        getUserData(window.location.pathname)


    },[window.location.pathname])


    return(
        <div>
            <Navbar></Navbar>
            <img src={user.profile_picture}/>
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
}
