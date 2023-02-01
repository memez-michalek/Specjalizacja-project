import Dropzone from "react-dropzone";
import { imageUploader } from "../components/uploaders/image-uploader";
import { ImageUpdate } from "../components/updaters/image-updater";
import { useContext } from "react";
import { Context } from "../components/sessionContext";
import {useState} from "react"

export default function UploadFiles({handleChange, handleSubmit, formData, image_ids} , props){

    const [uploadedImageIds, setUploadImageIds] = useState([]);
    const [context, setContext] = useContext(Context);
    console.log(props)
    const onDrop = async (acceptedFiles) => {
        console.log(acceptedFiles)
        const delta = acceptedFiles.length - image_ids.length
        console.log(delta)
        if(delta > 0){

          const uploadedImageIds = await imageUploader(acceptedFiles.slice(-delta), context.key);
          if (uploadedImageIds && uploadedImageIds.length > 0) {
            setUploadImageIds([...uploadedImageIds, ...uploadedImageIds]);
            acceptedFiles.splice(acceptedFiles.length - delta, delta);
            ImageUpdate(acceptedFiles, image_ids, context.key);
          }
            /*imageUploader(acceptedFiles.slice(-delta), context.key)
            .then(uploadedImageIds =>{
              acceptedFiles.splice(acceptedFiles.length - delta, delta)
              ImageUpdate(acceptedFiles, image_ids, context.key)
              if (uploadedImageIds && uploadedImageIds.length > 0) {
                image_ids.push(uploadedImageIds);
              }
            })
            */
        }else if(acceptedFiles.length === image_ids.length){
          console.log(context.key)
          console.log(props.key)
            console.log("updates" + ImageUpdate(acceptedFiles,image_ids, context.key))
        }else{

        }
        image_ids.push(...uploadedImageIds);
        console.log(acceptedFiles);
        console.log(image_ids)
      }

return(
  /*
  <div>
    <p>You are changing post image to</p>
    {acceptedFiles.map(file=>{
      <img src={file} alt="post image"></img>
    })}*/



    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Title:

        <input
          type="text"
          name="title"
          value={formData.title}
          {...console.log(handleChange)}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Content:


        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        File:
        </label>
        {console.log(context.key)}
        <Dropzone onDrop={onDrop}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              Click me to upload a file!
            </div>
          )}
        </Dropzone>

        <br />

      <button type="submit">Update post</button>
      </form>

  </div>
)

}
