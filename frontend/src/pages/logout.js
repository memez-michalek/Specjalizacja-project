import {Context} from "../components/sessionContext"
import { useNavigate } from 'react-router-dom';
import {useContext} from "react"

export default function Logout(){
    const [context, updateContext] = useContext(Context);
    const navigate = useNavigate();
    updateContext({"key" : "", "username" : ""})
    navigate("/");
}
