import React from "react";
import styles from "./Card.module.css"

export default function Card({name, image, genres, rating}){
    return (
        <div className={styles.cardCont}>
            <div className={styles.img}>
                <img src={image} alt="" width="200px" height="120px"/>
            </div>
            <div className={styles.name}>
                <h3>{name}</h3>
            </div>
            <div className={styles.genres}>
            {
            genres.length ?
            <p>{ genres.name ?
            genres.map(genre => genre.name).join(',') :
            genres.join(',')}</p> : <p>No tiene genero</p>
        }  
            </div>
            <div className={styles.rating}>
                <h4>⭐ {rating}</h4>
            </div>
        </div>
    )
}