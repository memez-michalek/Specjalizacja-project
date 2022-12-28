import axios from 'axios'
import {react, useEffect, useState} from 'react'
import {UserLoader} from "./user-loader"

export function FriendLoader(props){
    let [friends, setFriends] = useState({})
    async function getFriends(userIds){
        let userList = []
        for(const user of userIds){
            try{
                let response = (await axios.get(user, { responseType: 'json' })).data
                userList.push(response)
            }catch(err){
                console.error(err)
            }
        }
        setFriends(userList)
    }

    useEffect(()=>{
        getFriends(props.friends)
    }, [props.friends])



    if (friends.length > 0){
    return (
        <div>
            {friends && friends.map((friend)=>(
                <UserLoader user={friend}></UserLoader>
            ))}
        </div>
    )
    }else{
        return(

                <p>It's quiet in here at the moment.</p>
        )
    }

}
