import axios from "axios"
import {useState} from "react"
import {useEffect} from "react"
import { Link } from 'react-router-dom';
import styles from "./rounded-profile-picture.module.css"

export function UserLoader(props){
    let [user, setUser] = useState(Object);
    console.log(props.props)
    useEffect(() =>{
        async function get_user(id){
            let user;
            try {
                user = (await axios.get(`${id}`, { responseType: 'json' })).data
                console.log(user)
            } catch (err) {
                return null
            }
            setUser(user)
        }
        get_user(props.props);
    }, [props.props])

    console.log(user)
    return(
        <div>
        <Link to={"profiles/" + user.id}><img className={styles.profilepicture} src={user.profile_picture}></img></Link>
        </div>
    )

}
