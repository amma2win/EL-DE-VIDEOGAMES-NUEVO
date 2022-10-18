//const axios = require ("axios");
const {Genre,Videogame} = require ('../../db');




const postVideoGames = async(req, res) =>{
    // traigo data del body
    const  { name, description,image,released, rating, platform, genres} = req.body
    try {
      
      /* if (!name || !description || !platform){
        res.status(400).send('Faltan datos en el body !')
      } */
      const newVideogame = await Videogame.create({
        name,
        description,
        image,
        released,
        rating,
        platform
       
      });

      let genreDb = await Genre.findAll({
        where: { name: genres }});
       await newVideogame.addGenre(genreDb)
       res.status(201).send('Videogame Creado');
      }catch(e){
        res.status(404).send(console.log(e))
      }}
     
      
 
      
  
module.exports= {
    postVideoGames
}