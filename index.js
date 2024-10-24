//Ejemplo de activación de Hot Reload
//console.log("Hola desde NodeJS, esto está en hot reload") //actualiza los cambios de manera automatica

//const express = require('express')
//Imprtar la libreria para crear un servidor web - common js
//instanciar nuestra aplicacion web

import express from'express'
import generalRoutes from'./routes/generalRoutes.js'
import userRoutes from'./routes/userRoutes.js'
const app= express()

const port = 3000
app.listen(port,()=>{
    console.log(`La aplicacion ha iniciado en el puerto: ${port}`)
})

//Ruta (Routing-enrutamiento para petuiciones)
app.use('/',generalRoutes)//si se coloca otro igual, con el moismo verbo, será ignorado el siguiente
app.use('/usuario',userRoutes);
//



