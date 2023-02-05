import axios from "axios"
import {useState} from "react"
import {useEffect} from "react"
import { Link } from 'react-router-dom';
import styles from "../rounded-profile-picture.module.css"
import { ImageLoader } from "./image-loader";

export function UserLoader(props){
    let [user, setUser] = useState({});
    const [isLoading, changeLoadingState] = useState(true);
    console.log(props)
    useEffect(() =>{
        async function get_user(id){
            let user;
            try {
                user = (await axios.get(`${id}`, { responseType: 'json' })).data

            } catch (err) {
                return null
            }finally{
                setUser(user)
                changeLoadingState(false)
            }
        }
        get_user(props.user);
    }, [props.user])

    if(!isLoading && user){
    return(

        <div>
        {console.log(user.profile_picture)}
        <Link to={"/profiles/" + user.id}><ImageLoader width="40px" height="40px" images={[user.profile_picture]}></ImageLoader></Link>
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
