import axios from "axios"


function AddFriend(props){

    const handleClick = () => {

        const formData = new FormData()
        formData.append('from_user', props.username)
        formData.append('to_user', props.toUserId)
        axios.defaults.headers.common['Authorization'] = 'Token ' + props.token
        axios.post('http://localhost:8000/api/friend/', formData)
    }
    return (
        <div>
            <button onClick={handleClick}> Add Friend</button>
        </div>
    )

}

export default AddFriend;
