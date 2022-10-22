import React from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from '../../actions/index';


export default function Detail (props) {
console.log(props)
const dispatch = useDispatch();


useEffect(()=> {
    dispatch(getDetail(props.match.params.id));
},[dispatch,props.match.params.id])

const myVideogames = useSelector ((state)=>state.videodetails)
console.log(myVideogames)

return (
    <div>
        {
            
           myVideogames.length >0 ?
            <div>
                <div>
                   <p>Nombre:{myVideogames[0].name}</p> 
                    <p>Plataformas:{myVideogames[0].platforms }</p> 
                    <p>Descripcion {myVideogames[0].description}</p>
                    {/* <h4>Generos: {myVideogames[0].genres.map(e => e.name +(' '))}</h4> */}
                    <h4>Generos: {!myVideogames[0].createdAtDb ? myVideogames[0].genres + ' ' : myVideogames[0].genres.map(e => e.name +(' ')).join(', ')}</h4> 
                    <small>Fecha de lanzamiento {myVideogames[0].released}</small>
                    <img src={myVideogames[0].image} alt="" width="800px" height="600px"/>
                    <small>Rating {myVideogames[0].rating}</small>
                </div>

                {/* <h1>soy {myVideogames[0].name? myVideogames[0].name : myVideogames[0].name}</h1> */}
               {/*  
                <small>Rating {myVideogames[0].rating}</small>
                <p>Descripcion {myVideogames[0].description}</p>
                <p>Fecha de lanzamiento {myVideogames[0].released}</p>
                <h2>Plataformas {myVideogames[0].platforms ? myVideogames[0].platforms : myVideogames[0].platform}</h2>
                <h4>Generos: {!myVideogames[0].createdAtDb ? myVideogames[0].genres + ' ' : myVideogames[0].genres.map(e => e.name +(' '))}</h4> */}
                
                
            </div>  : <p>Cargando...</p>
        }

        <Link to= '/home'>
            <button>Volver</button>
        </Link>
    </div>
)

}
