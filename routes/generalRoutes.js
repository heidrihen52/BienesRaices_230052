import express from'express'
const router= express.Router()



//Ruta (Routing-enrutamiento para petuiciones)
router.get("/", function(req,res){
    res.send("Hola desde la web, en NodeJS")
})

router.get("/quieneres", function(req,res){
    res.json(
        {
            "nombre":"Adrian Perez Jimenez",
            "Carrera": "DSM",
            "Grado":"4",
            "Grupo":"A"
        }
    )
})



export default router; //Esta palabra reservada de js me permite exportar los elementos