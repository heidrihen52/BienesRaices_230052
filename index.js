//Ejemplo de activación de Hot Reload
//console.log("Hola desde NodeJS, esto está en hot reload") //actualiza los cambios de manera automatica

//const express = require('express')
//Imprtar la libreria para crear un servidor web - common js
//instanciar nuestra aplicacion web

import express from'express'
const app= express()

const port = 3000
app.listen(port,()=>{
    console.log(`La aplicacion ha iniciado en el puerto: ${port}`)
})

//Ruta (Routing-enrutamiento para petuiciones)
app.get("/", function(req,res){
    res.send("Hola desde la web, en NodeJS")
})

app.get("/quieneres", function(req,res){
    res.json(
        {
            "nombre":"Adrian Perez Jimenez",
            "Carrera": "DSM",
            "Grado":"4",
            "Grupo":"A"
        }
    )
})
//

