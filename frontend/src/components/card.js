import Card from "react-bootstrap/Card";
import React from 'react'
import {ImageLoader} from "./loaders/image-loader";
import {UserLoader} from "./loaders/user-loader";
import {LoadCommunity} from "./loaders/post-community-loader";
import {CreateComment} from "../forms/uploadCommentForm"
import {CommentLoader} from "./loaders/comment-loader"
import {Link} from "react-router-dom"

function MainCard(props){
    console.log(props)
    return(

        <Card>
            <LoadCommunity props={props.post.community}></LoadCommunity>
            <UserLoader user={props.post.user}></UserLoader>
            <Link to={`/post/`+ props.post.id}>
            <ImageLoader images={props.post.images} width="500" height="500"></ImageLoader>
            </Link>
            <Card.Body>
                <Card.Title>{props.post.title}</Card.Title>
                <Card.Text>{props.post.description}</Card.Text>
                <CreateComment post={props.post.id}></CreateComment>
                <CommentLoader posts={props.post.comments}></CommentLoader>
            </Card.Body>

        </Card>
    )
}

export default MainCard;
