import {useState, useEffect} from 'react'
import axios from 'axios'

import LoadCommunities from "../components/loaders/community-loader"

export default function DiscoverCommunity(){
    const [communities, setCommunities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getCommunities(){
            try{
                const response = await axios.get("http://localhost:8000/api/community/")
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
    return(
        <div>
            {console.error(communities)}
            <LoadCommunities communities={communities}></LoadCommunities>
        </div>
    )
}
