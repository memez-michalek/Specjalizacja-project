import React from 'react';
import { Card, Image, Col } from 'react-bootstrap';
import { ImageLoader } from './loaders/image-loader';

function UserCard (props){
  console.log(props)
  return(

    <Card className="mb-3">
      <Card.Header as="h3">User Information</Card.Header>
      <Card.Body>
        <ImageLoader images={[props.profile_picture]} width={300} height={300}></ImageLoader>
        <Card.Title className="mt-3">{props.username}</Card.Title>
      </Card.Body>
    </Card>
  )
};

export default UserCard;
