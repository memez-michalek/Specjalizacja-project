import Card from "react-bootstrap/Card";
import React from 'react'

function MainCard(props){
    [images, setImages] = React.useState([])


    useEffect(() =>{

    })
    console.log(props)
    return(
        <Card style={{ width: '10rem'}} onClick={''}>
            {props.props.images.map(image=>(
            <Card.Img variant="top" src={image}/>
            ))}
            <Card.Body>
                <Card.Title>{props.props.title}</Card.Title>
                <Card.Text>{props.props.description}</Card.Text>
                <Card.Text>{props.props.user}</Card.Text>
            </Card.Body>

        </Card>
    )
}

export default MainCard;
