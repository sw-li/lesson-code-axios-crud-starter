const router = require("express").Router()
const ApiService = require("../services/api.service")
const apiService = new ApiService()

router.get("/movie-characters/list", (req,res)=>{
    apiService.getAllCharacters()
    .then(results => {
        res.render("pages/characters-list", {characters:results.data})
    })
})

router.get("/movie-characters/create", (req,res)=>{
    res.render("pages/new-character-form")
})


router.post("/movie-characters/create", (req,res)=>{
    apiService.createCharacter(req.body)
    .then(respose=>{
        console.log(respose)
        res.redirect("/movie-characters/list")
    })
})

router.get("/movie-characters/edit/:id", (req,res)=>{
    apiService.getOneCharacter(req.params.id)
    .then(result => {
        const character = result.data
        res.render("pages/edit-character-form",character)})
    
})

router.post('/movie-characters/edit/:id', (req,res)=>{
    apiService.editCharacter(req.params.id, req.body)
    .then(()=> res.redirect("/movie-characters/list"))
})

/* router.post('/movie-characters/delete/:id', (req,res)=>{
    apiService.deleteCharacter(req.params.id)
    .then(()=> res.redirect("/movie-characters/list"))
}) */


module.exports = router