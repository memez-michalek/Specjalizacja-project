import Image from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";

export function ImageLoader(props){
    let [images, setImages] = useState([]);
    console.log(props)
    useEffect(() => {
        async function getImage (id) {
          let imageBlob
          try {
            imageBlob = (await axios.get(`${id}`, { responseType: 'json' })).data
          } catch (err) {
            return null
          }
          return imageBlob.image;
        }
        async function getImages () {
          const imageArray = []
          for (const id of props.images) {
            imageArray.push(await getImage(id))
          }
          setImages(imageArray)
        }
        //stack  overflow

        getImages()
      }, [])
      return images.map((img) => {
        return <img width={props.width} height={props.height} src={img} />
      })
    }
