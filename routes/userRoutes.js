import express, { application, request, response } from'express'
import { formularioLogin, formularioRegister,formularioPasswordRecovery } from '../controllers/userController.js';
const router=express.Router();

//Get se utiliza para lalectura de datos e informacion
//endpoints: rutas para acceder a las secciones o funciones de nuestra apluicación web
//: en una ruta definen de manera poscicional los parametros de entrada
router.get("/findByID/:id",function(request, response){
    response.send(`Se esta solicitando buscar al usuario con ID: ${request.params.id}`);
});

//" componentes de una peticion ruta(a donde voy), funcion callback(que hago)

//POST se utiliza para el envio de datos e info del cliente al server
router.post("/newUser/:name/:email/:password",function(req,res){
    res.send(`Se gha solicitado la creación de un nuevo usuario de nombre: ${req.params.name}, asociado al correo electronico: ${req.params.email}, con la contraseña: ${req.params.password}`)
})
//PUT - Se utiliza para la actualizacion total de info del cliente al servidor
router.put("/replaceUserByEmail/:name/:email/:password", function(a,b){//no es completamente necesario usar req y res, tambien se pueden usar letras
    b.send(`Se ha solicirtado el reemplazo de toda la información del usuario: ${a.params.name},con correo: ${a.params.email}, y contraseña: ${a.params.password} `)
})
//PATCH - Se utiliza para la actualizacion parcial de datos
router.patch("/updatePassword/:email/:newPassword/:newPasswordConfirm",function(request,response){
    const {email,newPassword,newPasswordConfirm} = request.params //Desestructuracion de un objeto
    
    if(newPassword===newPasswordConfirm){
    response.send(`Se ha solicitado la actualizacion de la contraseña del usuario con correo: ${email}, con la nueva contraseña: ${newPassword}, se aceptan los cmabios ya que la contraseña y confirmacion son la misma`)
    }else{
        response.send(`Se ha solicitado la actualizacion de la contraseña del usuario con correo: ${email}, con la nueva contraseña: ${newPassword}, pero se rechaza el cambio dado que la nueva contraseña y su confirmación no coinciden`)
    }
});
//DELETE
router.delete("/deleteUser/:email",function(req,res){
    res.send(`Se ha solicitado la eliminacion del usuario asociado al correo: ${req.params.email}`)
})


router.get("/login",formularioLogin/**middleware */)
router.get("/createAccount",formularioRegister)
router.get("/passwordrecovery",formularioPasswordRecovery)

export default router;

