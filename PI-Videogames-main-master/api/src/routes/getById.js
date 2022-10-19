const { Router} = require ("express")
const {Genre,Videogame} = require ('./../db');
const router = Router()
const { apiKey } = process.env;
const axios = require ('axios');

router.get('/:id', async (req,res) => {
 try{
    const {id} = req.params
    if(!id.includes('-')) {
        const gameDetail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
        const data = await gameDetail.data
        let gameId = [{
            id: data.id,
            name: data.name,
            image: data.background_image,
            released: data.released,
            description: data.description_raw,
            rating: data.rating,
            genres: data.genres.map(g => g.name).join(','),
            platforms : data.platforms.map(p => p.platform.name).join(',')
        }]
      
        res.send(gameId)
       
    } else {
        let gameFounded = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }]
        })
        var newArr = []
        newArr.push(gameFounded)
        
        res.send(newArr)
    }

 }catch(e){
    console.log(e)
 }
})

/* router.delete('/:id', async(req, res) => {

    const { id } = req.params
    try {
        const destroyedGame = await Videogame.destroy({ where: { id: id } })
        res.send(200)
    } catch (e) {
        res.status(404).send(console.log(e))
    }

}) */



module.exports = router ;