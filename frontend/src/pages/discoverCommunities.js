import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImageLoader } from '../components/loaders/image-loader';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
export default function DiscoverCommunity(){

    const [communities, setCommunities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getCommunities(){
            try{
                const response = await axios.get("http://localhost:8000/api/community")
                setCommunities(response.data)
                console.log(response.data)
                console.log(communities)
            }catch(e){
                console.error(e)
            }finally{
                setIsLoading(false)
            }


        }
        getCommunities()

    }, [])

    if(!isLoading){
        console.log(communities)

    return(
        <div>
          <Navbar />
          {communities &&
            communities.map((community) => (
              <div key={community.id}>
                <Link to={`${community.id}`}>
                  <h1>{community.name}</h1>
                  <p>{community.bio}</p>
                  <ImageLoader images={[community.background_image]} width="300" height="300" />
                </Link>
              </div>
            ))}
        </div>
      );
    }else{
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}
