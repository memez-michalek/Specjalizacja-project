import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchForm(props){
    const [formData, setFormData] = useState({
        searchQuery: '',
        searchOption: 'community'
    });
    const [results, setResults] = useState([]);
    console.log(props)
    useEffect(() => {
        const fetchResults = async () => {
            console.error(formData)
            const response = await axios.get(`http://localhost:8000/api/search?${formData.searchOption}=${formData.searchQuery}`);
            console.log(response)
            console.error(response.data);
            setResults(response.data);
            console.log(response.data);
            props.setSearchData(response.data)
        };

            fetchResults();

    }, [formData.searchQuery, formData.searchOption]);

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };


    console.log(results)
    return (
        <div>
            <form>
                <select name="searchOption" onChange={onChange} value={formData.searchOption}>
                    <option value="community">Community</option>
                    <option value="user">User</option>
                    <option value="post">Post</option>
                </select>
                <input name="searchQuery" type="text" value={formData.searchQuery} onChange={onChange} />
            </form>
        </div>
    );
}
