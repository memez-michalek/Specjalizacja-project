import Card from "react-bootstrap/Card";
import React from 'react'
import {ImageLoader} from "./loaders/image-loader";
import {UserLoader} from "./loaders/user-loader";
import {LoadCommunity} from "./loaders/post-community-loader";
import {CreateComment} from "../forms/uploadCommentForm"
import {CommentLoader} from "./loaders/comment-loader"
import {Link} from "react-router-dom"

function MainCard(props){
    return(

        <Card>
            <LoadCommunity props={props.props.community}></LoadCommunity>
            <UserLoader user={props.props.user}></UserLoader>
            <Link to={`/post/`+ props.props.id}>
            <ImageLoader images={props.props.images} width="500" height="500"></ImageLoader>
            </Link>
            <Card.Body>
                <Card.Title>{props.props.title}</Card.Title>
                <Card.Text>{props.props.description}</Card.Text>
                <CreateComment post={props.props.id}></CreateComment>
                <CommentLoader posts={props.props.comments}></CommentLoader>
            </Card.Body>

        </Card>
    )
}

export default MainCard;
