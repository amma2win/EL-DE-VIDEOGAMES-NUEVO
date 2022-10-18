import React from "react";



export default function Card({name, image, platform, genres, rating}){
    return (
        <div>
            <h2>{name}</h2>
            <h6>{genres}</h6>
            <p>{platform}</p>
            <img src={image} alt ="img not found" width="300px" height ="200px"/>
            <small>{rating}</small>
        </div>
    )
}
