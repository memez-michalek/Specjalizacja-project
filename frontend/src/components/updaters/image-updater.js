import {useContext, useEffect} from "react"
import axios from 'axios';
export function ImageUpdate(files, ids, authorization){
    const imageData = new FormData();
    /*
      for(let img of files){
        imageData.append('image', img);
      }
      */
    if(files.length !== ids.length){
      return false;
    }

    console.log(files)
    console.log(authorization)
    try{
      // axios.defaults.headers.common["Authorization"] = "Token " + authorization
      //axios.defaults.headers.common["Authorization"] = `Token ${authorization}`;

      for(let i=0; i<ids.length; i++){
        imageData.append('image', files[i]);
        fetch('http://localhost:8000/api/images/' + ids[i] + '/',{
          method: 'PUT',
          headers: {
            'Authorization': 'Token ' + authorization,
          },
          body: imageData,
        })
      }


      /*
      for(const i=0; i<ids.length; i++){
          console.log(ids)
        imageData.append('image', files[i]);
        const response = await axios.put('http://localhost:8000/api/images/' + ids[i] + '/', imageData);
        console.log(response.data);

      */



    return true;
    }catch(e){
        console.debug(e)
        return false
    }

}
