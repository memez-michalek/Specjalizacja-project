import axios from 'axios';
export async function imageUploader(files, authorization){

    const imageData = new FormData();
    console.log(authorization)
    console.log(files)
    let output = []
      for(let img of files){
        imageData.append('image', img);
      }
    try{
      const response = await axios.post(
        'http://localhost:8000/api/images/',
        imageData,
        {
          headers: {
            Authorization: `Token ${authorization}`
          }
        }
      );
      console.log(response.data);
      return response.data;

        //const response = await axios.post('http://localhost:8000/api/images/', imageData);
        //console.log(response.data);
        //return response.data
    }catch(e){
        console.debug(e)
        return []
    }

}
