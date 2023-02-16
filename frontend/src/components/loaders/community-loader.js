import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImageLoader } from './image-loader'
import { Link } from 'react-router-dom';

export default function LoadCommunities(props){

    console.error(props)
    return(
        <div>
          {props.communities &&
            props.communities.map((community) => (
              <div key={community.id}>
                {console.error(community)}
                <Link to={`${community.id}`}>
                  <h1>{community.name}</h1>
                  <p>{community.bio}</p>
                  <ImageLoader images={[community.background_image]} width="300" height="300" />
                </Link>
              </div>
            ))}
        </div>
      );

}
