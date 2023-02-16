import React from 'react'
import { useEffect, useContext } from "react"
import Navbar from "../components/navbar"
import MainCard from '../components/postCard'
import {Context} from "../components/sessionContext"
import LoadCommunities from '../components/loaders/community-loader'
import { Link } from 'react-router-dom'
import UserCard from '../components/userCard'


const Main = () =>{
    const [data, setData] = React.useState([])
    const [communityData, setCommunityData] = React.useState([])
    const [userData, setUserData] = React.useState([])
    const [postData, setPostData] = React.useState([])
    const [searchData, setSearchData] = React.useState([])
    const [context, setContext] = useContext(Context)
    useEffect(()=>{
        setPostData([])
        setUserData([])
        setCommunityData([])
        console.error(searchData)
        if(searchData && searchData.length > 0){
            console.log(searchData)
            if(searchData[0].type === "community"){
                setCommunityData(searchData)
            }else if(searchData[0].type === "user"){
                setUserData(searchData)
            }else{
                setPostData(searchData)
            }
        }else{
        fetch('http://localhost:8000/api/posts/')
        .then(res => res.json())
        .then((result)=>{
            setData(result)
        })
        .catch(error=>{
            console.error("found error ", error)
        })
    }
    }, [searchData])

    if (typeof(context.key) !== "string" || context.key ==="") {
        return (<div><p>Please log in or register to view this content.</p>
        <Link to="/login">Please log in</Link>
        <Link to="/register">Please register</Link></div>)
    }else{
        if(communityData.length > 0){

                        return(
                        <div>
                            <Navbar setSearchData={setSearchData}></Navbar>
                        <LoadCommunities communities={communityData}></LoadCommunities>
                        </div>
                        )



        }else if(postData.length > 0){

                    return(
                        <div>
                            <Navbar setSearchData={setSearchData}></Navbar>
                            <div>
                            {postData && postData.map(post=>{
                                return(
                                <div>
                                <MainCard post={post}></MainCard>
                                </div>)
                            })}
                            </div>
                        </div>
                    )
                        /*
                        {postData && postData.map(post =>{
                        {console.log(post)}

                            <div>

                        <MainCard post={post}></MainCard>
                        </div>
                        )
                    })}*/


        }else if(userData.length > 0){


                    {/*<Navbar setSearchData={setSearchData}></Navbar>*/}
                        return(

                            <div>
                            <Navbar setSearchData={setSearchData}></Navbar>
                            {userData && userData.map( user=>{

                            return(
                                <div>
                            <UserCard  profile_picture={user.profile_picture} username={user.username}> </UserCard>
                                </div>
                            )
                            }

                            )}
                            </div>
                            )



        }else{


    return(
        <div>
            <Navbar setSearchData={setSearchData}></Navbar>
            {data && data.map(post=>(

                <div>
                <MainCard post={post}></MainCard>
                </div>
            ))}
        </div>
    )
    }}
}


export default Main;
