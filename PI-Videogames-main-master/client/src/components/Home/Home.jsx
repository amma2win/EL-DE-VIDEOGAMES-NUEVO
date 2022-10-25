import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getVideoGames,filterByGenres, getGenres, sortVgames,filterCreated } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import s from "./../Home/Home.module.css";
/* import '../Home/Home.css' */
import imagen from "../../imagen/folder_mario_games_14558.png"
export default function Home (){

const dispatch = useDispatch()
const allVideogames = useSelector((state)=> state.videogames)
const allGenres = useSelector((state) => state.genres)
const [render,setRender] = useState('') 
const [currentPage,setCurrentPage] = useState(1)
const [videogamesPerPage, setVideogPerPage ] = useState(15) //me traigo 15 vg por pag
const indexOfLastVg = currentPage * videogamesPerPage // pagina actual por la cantidad de vg por pagina q tengo seria 15 1x15
const indexOfFirstVg = indexOfLastVg - videogamesPerPage 
const currentVideogame = allVideogames.slice(indexOfFirstVg,indexOfLastVg)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect (()=>{  //para poder cargar previamente dat
    dispatch(getGenres());
    dispatch(getVideoGames());
},[dispatch])

function handleClick(e){
  window.location.reload() // que vuelva a su punto de origen la
    dispatch(getVideoGames());
}

function handleGenreFilter(e){
    e.preventDefault(e);
    dispatch(filterByGenres(e.target.value))
}



function handleSortvgames(e){
    e.preventDefault();
    dispatch(sortVgames(e.target.value))
    setCurrentPage(1); 
    setRender(`Ordenado${e.target.value}`)
}
function handleFilterCreated(e){
   
    dispatch(filterCreated(e.target.value))
}

return (
    <div className={s.container}>
      
        <div className={s.logo}>
          <img src={imagen}  alt="logo not found" /> 
          </div>
          <div className={s.titleVideogames}>
            <h1>Videogames APP</h1>
            </div>
          
        
     
     
        <div className={s.creaVg}>
             <Link to= '/videogames'>
        <button className={s.buttonCrear}>Crear Videogame</button>
        </Link>
        
       
        
        <button className={s.boton1} onClick={e => {handleClick(e)}}>
            Volver a cargar todos los Videogames
        </button>
        <div>
          
            <div className={s.filters}>                    
                  <select className={s.filtroGenero} onChange={e => handleGenreFilter(e)} >
                    <option hidden value="genres">Generos</option>
                    
                    {allGenres?.map((e,i) => {
                         
                         return(
                            
                            <option value={e.name} key={i}>{e.name}</option>
                             )
                    })}      
                  </select>
                </div>
                <div className={s.acomodarFiltros}>  
                  <select className={s.orden}  onChange={e => handleSortvgames(e)} >
                    <option hidden value="Orden">Orden</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                    <option value='rating'>Mejores Rating</option>
                  </select>
                  <select className={s.FILTROS} id="" onChange={e => handleFilterCreated(e)}>
                    <option hidden value="Origen">Origen</option>
                    <option value="All">Todos los videogames</option>
                    <option value="created">Creados</option>
                    <option value="api">Existentes</option>
                  </select>
                </div> 
                </div>
                <div className={s.pagination}>
            <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideogames= {allVideogames.length}
            paginado = {paginado}
            />
            </div>
            <div className={s.searchBar}>      
                <SearchBar/>
            </div>
       {
            !allVideogames.length? 
            <div >
              <div className="center-body">
              <a href="http://gifgifs.com/" title="http://gifgifs.com"><img src="http://gifgifs.com//animations/creatures-cartoons/super-heroes/Batman_symbol_2.gif" border="0" alt="http://gifgifs.com" /></a><br/><a href="http://gifgifs.com/"></a>
</div>
                Loading
            </div>:null
            }
        



           <div className={s.cards}>
        {
          currentVideogame?.map((e) => {
            return (
            <div className= {s.cardsjuegos} key= {e.id} >
                <Link to ={"/home/" + e.id}>
            <Card  name ={e.name} image={e.image} released={e.released }rating={e.rating} platforms={e.platforms} genres={e.genres ? e.genres : e.genre}/>
            </Link>
            </div>
          );
        })
        }
        </div>  
        </div>
    </div>
)
}