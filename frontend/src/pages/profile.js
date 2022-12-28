import react from 'react';
import {useEffect} from "react"
import { useState } from 'react';
import axios from 'axios'
import Navbar from "../components/navbar"
import {FriendLoader} from "../components/loaders/friend-loader"

export default function Profile(){
    let [user, setUser] = useState(Object)

    useEffect(() => {
        async function getUserData(id){
            let userData
          try {
            let data = id.split('/')
            userData = (await axios.get(`https://dev.local/api/users/${data[data.length - 1]}`, { responseType: 'json' })).data
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
            <p>friends</p>
            {user.friends ? (
                <FriendLoader friends={user.friends} />
            ) : (
                <p>It's quiet here at the moment.</p>
            )}
        </div>
    )
}
