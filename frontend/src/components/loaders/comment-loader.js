import {react, useEffect, useState} from 'react'
import axios from 'axios';
import { useLoader, UserLoader } from "./user-loader"

export function CommentLoader(props){
    let [comments, setComments] = useState([]);

    async function getComments(ids){
        let api_values = []
        for(const id of ids){
            try{
                let comment = (await axios.get(`${id}`, { responseType: 'json' })).data
                api_values.push(comment)
            }catch(e){
                console.error(e)
            }
        }
        setComments(api_values)
    }

    useEffect(() => {
        getComments(props.posts)

    },[])

    return (
        <div>
            <p>comments</p>
            {comments && comments.map((comment) =>(
                <div>
                <p>{comment.text}</p>
                <UserLoader user={comment.user}></UserLoader>
                </div>
            ))}

        </div>
    )
}
