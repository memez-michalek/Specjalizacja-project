import Card from "react-bootstrap/Card";
import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import Typography from "react";
import {ImageLoader} from "./image-load";
import {UserLoader} from "./user-load";
function MainCard(props){

    return(
        <Card>

            <ImageLoader props={props.props}></ImageLoader>

            <Card.Body>
                <Card.Title>{props.props.title}</Card.Title>
                <Card.Text>{props.props.description}</Card.Text>
                <UserLoader props={props.props.user}></UserLoader>
            </Card.Body>

        </Card>
    )
}

export default MainCard;
