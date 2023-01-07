import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../components/sessionContext";

export function CreateComment(props) {
  const [formData, setFormData] = useState({
    comment: "",
  });
  const [context, updateContext] = useContext(Context);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const packagedForm = new FormData();

    axios.defaults.headers.common["Authorization"] = `Token ${context.key}`;
    packagedForm.append("text", formData.comment);
    packagedForm.append("user", context.username);
    packagedForm.append("post", props.post);

    try {
      const response = await axios.post("http://localhost:8000/api/comments/", packagedForm);

      navigate("/")

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Comment:</label>
        <input type="text" name="comment" value={formData.title} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
