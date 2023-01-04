import React from 'react';

export function PostForm() {
  const [files, setFiles] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (const file of files) {
      formData.append('image', file);
    }
    axios.post('https://dev.local/api/images/', data)
     .then(response => {
    console.log(response.data);
    })
    .catch(error => {
    console.error(error);
  });

    // You can now send the form data to the server using fetch or another HTTP library
  };

  return (
    <div>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="file"
        multiple
        onChange={(event) => setFiles(event.target.files)}
      />
      <button type="submit">Select Images</button>
    </form>
    </div>
  );
}
