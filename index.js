//Ejemplo de activación de Hot Reload
//console.log("Hola desde NodeJS, esto está en hot reload") //actualiza los cambios de manera automatica

//const express = require('express')
//Imprtar la libreria para crear un servidor web - common js
//instanciar nuestra aplicacion web

import express from'express'
import generalRoutes from'./routes/generalRoutes.js'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import userRoutes from'./routes/userRoutes.js'
import db from'./db/config.js'


//Crear la app
const app= express()

//Habilitar la lectura de datos de formularios
app.use(express.urlencoded({extended:true}))

//habilitar cookie parser
app.use(cookieParser())

//Habilitar CSRF
app.use(csrf({cookie:true}))

//conexion a la base de datos
try {
    await db.authenticate();
    db.sync()
    console.log("Conexion exitosa a la base de datos")
} catch (error) {
    console.log(error)
}
//configurar template engine (PUG)
app.set('view engine','pug')
app.set('views','./views')

//Carpeta publica
app.use(express.static('./public'))

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`La aplicacion ha iniciado en el puerto: ${port}`)
})

//Ruta (Routing-enrutamiento para petuiciones)
app.use('/',generalRoutes)//si se coloca otro igual, con el moismo verbo, será ignorado el siguiente
app.use('/usuario',userRoutes);
//



