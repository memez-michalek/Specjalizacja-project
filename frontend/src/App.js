
import './App.css';
//import {BrowserRouter as Router , Route} from "react-router-dom";
import LoginForm from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'
import Main from './pages/main'
import Community from './pages/community'
import {Routes, Route} from "react-router-dom";
import { createContext } from 'react';
import {ContextProvider} from './components/sessionContext'
import {useState} from "react"
import Logout from "./pages/logout"
import PostForm from './forms/uploadPostForm';
import CommunityForm from './forms/uploadCommunityForm';
import DiscoverCommunity from "./pages/discoverCommunities"
import Post from "./pages/post"
import UpdatePost from "./forms/updatePostForm";

function App() {

  return (
      <ContextProvider>
     <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/communities" element={<DiscoverCommunity/>}></Route>
        <Route path="/upload_post" element={<PostForm/>}></Route>
        <Route path="/upload_community" element={<CommunityForm/>}></Route>
        <Route path="/post/*" element={<Post/>}></Route>
        <Route path="/profiles/*" element={<Profile/>}></Route>
        <Route path="/community/*" element={<Community/>}></Route>
     </Routes>
     </ContextProvider>
  );
}

export default App;
