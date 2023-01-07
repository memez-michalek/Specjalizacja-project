import axios from 'axios';
export async function imageUploader(files, authorization){

    const imageData = new FormData();

      for(let img of files){
        imageData.append('image', img);
      }
      axios.defaults.headers.common['Authorization'] = 'Token ' + authorization;
    try{
        const response = await axios.post('http://localhost:8000/api/images/', imageData);
        console.log(response.data);
        return response.data
    }catch(e){
        console.debug(e)
        return []
    }

}
