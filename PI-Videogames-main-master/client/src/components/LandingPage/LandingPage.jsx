import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={styles.container}>
            <div className={styles.card}>
            <p>{">  Ingresá al portal de Videogames..."}</p>
            <p>{"..."}</p>
            <p>{">  Presiona Ok para ir."}</p>
            <Link to ='/home'>
                <button>{"Ok "}</button>
            </Link>
            </div>
        </div>
    )

}