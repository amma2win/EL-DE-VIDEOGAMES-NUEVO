import React from "react";
import {useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {  getVideoGames, postVgames,getGenres, } from "../../actions";
import { Link, useHistory } from "react-router-dom";
import "./VideogameCreate.css";


    


   /*  function validateInput(input) {
        var errors = {};
        if(!input.name){
            errors.name = 'Name is required';
        } else if (input.name.length > 100 ){
            errors.name = "Name is too long (Max = 100 characters)"
        }
        if(!input.description) {
            errors.description = 'Description is required';
        } else if (input.description.length > 1500) {
            errors.description = 'Description is too long. (Max = 1500 characters)'
        }
        if(!input.rating){
            errors.rating = 'Rating is required'
        } else if (input.rating > 5 || input.rating < 0) {
            errors.rating = "Rating must range between 0 to 5"
        }
        if(!input.released) {
            errors.released = "Date of release is required"
        }else if(input.released.length < 10) {
            errors.released = "Date of release is to long"
        }if(!input.image) {
            errors.image = "Image URL is required"
        } if(!input.genres[0]){
            errors.genres = "Minimun one Genre is required "
        } if (!input.platforms[0]){
            errors.platforms = 'Minimun one Platform is required' 
        }
        
        return errors;
    }
 */
    export default function VideogameCreate(){
        const dispatch = useDispatch()
        const allGenres = useSelector((state) => state.genres)
        const allGames = useSelector((state) => state.allVideogames)
        const [errors, setErrors] = useState({})
        const history = useHistory();
        const [input, setInput] = useState({
            name: '',
            description: '',
            released: '',
            rating: '',
            image:'',
            platform: "",
            genres: [],
        })
      

        function handleChange(e) {
            setInput({
                ...input,
                [e.target.name] : e.target.value
            })
            setErrors({
                ...input,
                [e.target.name] : e.target.value
            });
            console.log(input)
        }
    
        function handleSelect(e) {
            setInput({
                ...input,
                genres: [...input[e.target.name], e.target.value ]
            })
            setErrors(({
                ...input,
                [e.target.name] : e.target.value
            }));
    
        }
    
        function handleSubmit(e) {
            e.preventDefault();
            if (!input.name.trim()) {
                alert("El nombre es requerido")
            } else if (allGames.find( (e) => e.name.toLowerCase() === input.name.toLowerCase())) {
                alert(`El nombre ${input.name} ya existe, Porfavor elige otro`) 
            }  else if (!input.description) {
                alert("Your game need description")
            } else if (!input.rating || input.rating < 1 || input.rating > 5) {
                alert("Porfavor ingresa un rating correcto 1 ~ 5")
            } else if (!input.genres) {
                alert("Please insert at least one genre")
            } else if (input.genres.length === 0) {
                alert("Ingresar un genero")
            } else {
            dispatch(postVgames(input))
            alert('Videogame creado exitosamente!')
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                image:'',
                platform: "",
                genres: [],
            })
            history.push('/home')
        }}
 
        function handleDeleteGenres(el) {
            setInput({
                ...input,
                genres: input.genres.filter(param => param !== el)
            })
        }
        useEffect(() => {
            dispatch(getGenres())
            dispatch(getVideoGames())
          
        }, [dispatch])
        return (
            <div className="containerCreate">
                <div className="container1">
                    <div className="container2">
                        <Link to='/home'>
                            <p>Return</p>
                        </Link>
                    </div>
                    <div className="container2">
                        <h3>Crea tu Videogame</h3>
                    </div>
                </div>
                <div className="containerForm">
                    <form id="form" onSubmit={e => handleSubmit(e)}>
                        <label>Nombre:</label>
                        <input required="name" className={errors.name && 'danger'} type='text' value={input.name} name='name' placeholder="Name" onChange={e => handleChange(e)}/>
                        <label>Rating: </label>
                        <input className={errors.rating     && 'danger'} type='text' value={input.rating} name='rating' placeholder="From 0 to 5" onChange={e => handleChange(e)}/>
                        <label>Imagen URL:</label>
                        <input className={errors.image && 'danger'} type='text' value={input.image} name='image' placeholder="URL" onChange={e => handleChange(e)}/>
                        <label>Fecha de lanzamiento: </label>
                        <input className={errors.released && 'danger'} type='date' value={input.released} name='released' placeholder="
                        When it was created" onChange={e => handleChange(e)}/>
                        <label>Descripcion: </label>
                        <textarea className={errors.description && 'danger'} type='text' value={input.description} name='description' placeholder="About game..." onChange={e => handleChange(e)}/>
                     
                         <label>Plataformas: </label>
                        <input type="text" 
                        value={input.platform}
                        name= "platform"
                        onChange={(e) => handleChange(e)}/>
                     
                        <label>Generos: </label>
                        <select className={errors.genres && 'danger'} name='genres' onChange={(e) => handleSelect(e)}>
                        <option hidden value="genre">Genres</option>
                        {
                            allGenres?.map((e) => (
                                <option key={e.id} value={e.name}>{e.name}</option>
                            ))
                        }
                        </select>
                        <div className="genresForm">
                            {input.genres.map(e =>
                                <div className="genreInput">
                                    <div>
                                        {e}
                                    </div>
                                    <div className="minibutton" onClick={() => {
                                        handleDeleteGenres(e)
                                    }}>|X|</div>
                                </div>)}
                        </div>
                    <ul><li>{input.genres.map(e=>e +' ,')}</li></ul>
                       
                       
                        <button className="createButton" type="submit">Create Game</button>
                    </form>
                </div>
            </div>
        )
    }