import Card from "react-bootstrap/Card";
import React from 'react'
import {ImageLoader} from "./loaders/image-loader";
import {UserLoader} from "./loaders/user-loader";
import {LoadCommunity} from "./loaders/post-community-loader";
import {CommentLoader} from "./loaders/comment-loader";


function MainCard(props){
    return(
        <Card>
            <LoadCommunity props={props.props.community}></LoadCommunity>
            <UserLoader user={props.props.user}></UserLoader>
            <ImageLoader images={props.props.images} width="500" height="500"></ImageLoader>
            <Card.Body>
                <Card.Title>{props.props.title}</Card.Title>
                <Card.Text>{props.props.description}</Card.Text>
                <CommentLoader posts={props.props.comments}></CommentLoader>
            </Card.Body>

        </Card>
    )
}

export default MainCard;
