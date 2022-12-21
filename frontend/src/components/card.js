import Card from "react-bootstrap/Card";
import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import Typography from "react";
import {ImageLoader} from "./loaders/image-loader";
import {UserLoader} from "./loaders/post-user-loader";
import {LoadCommunity} from "./loaders/post-community-loader";
import { Link } from 'react-router-dom';


function MainCard(props){
    return(
        <Card>
            <ImageLoader images={props.props.images} width="500" height="500"></ImageLoader>

            <Card.Body>
                <Card.Title>{props.props.title}</Card.Title>
                <Card.Text>{props.props.description}</Card.Text>
                <LoadCommunity props={props.props.community}></LoadCommunity>
                <UserLoader props={props.props.user}></UserLoader>
            </Card.Body>

        </Card>
    )
}

export default MainCard;
