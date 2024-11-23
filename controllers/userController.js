import {check, validationResult} from 'express-validator'
import newUser from '../models/User.js'
import { where } from 'sequelize'
import moment from 'moment';
import {generateId} from '../helpers/tokens.js'
import{emailRegister}from '../helpers/emails.js'
import { request, response } from 'express'

const formularioLogin = (request,response)=>{
    response.render('auth/login',{
        
    })
}

const login = async(request,response) =>{
    await check('email').notEmpty().withMessage("El correo electronico es un campo obligatirio").isEmail().withMessage("El correo electronico no tiene el formato de: usuraio@dominio.extension").run(request)
    await check('password').notEmpty().withMessage("La contraseña es un campo obligatorio").isLength({min:8}).withMessage("La contraseña debe de ser de almenos 8 caracteres").run(request)
    let result = validationResult(request)
    if(!result.isEmpty()){
        //errores
        return response.render('auth/login',{
            page: 'acceder',
            errors: result.array()
        })
    }
}

const formularioRegister = (request,response)=>{
    response.render('auth/register',{
        page : "Crea una nueva cuenta",
        csrfToken: request.csrfToken()
    })
}

const register = async (request, response) => {
    //Validacion de los campos que se reciben en el formulario
    await check('nombre').notEmpty().withMessage("El nombre de usuario es obliagtorio").run(request)
    await check('fechaNac').notEmpty().withMessage("Debes colocar una fecha de nacimiento").run(request);
    // Validar que el usuario tenga 18 años
    await check('fechaNac')
    .custom((value) => {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        const isBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
        const actualAge = isBirthdayPassed ? age : age - 1;
        if (actualAge < 18) {
        throw new Error("Debes tener al menos 18 años para registrarte");
        }
        return true;
    }).run(request);

    await check('email').notEmpty().withMessage("El correo electronico es un campo obligatirio").isEmail().withMessage("El correo electronico no tiene el formato de: usuraio@dominio.extension").run(request)
    await check('password').notEmpty().withMessage("La contraseña es un campo obligatorio").isLength({min:8}).withMessage("La contraseña debe de ser de almenos 8 caracteres").run(request)
    await check('pass2_usuario').equals(request.body.password).withMessage("La contraseña y su confirmacion deben coincidir").run(request)
    
    let result = validationResult(request)

    //verificamos si hay errores de validacion
    if(!result.isEmpty()){
        //errores
        return response.render('auth/register',{
            page: 'Error al intentar crear la cuenta de usuario',
            csrfToken : request.csrfToken(),
            errors: result.array(),
            user: {
                nombre: request.body.nombre,
                email: request.body.email,
                fechaNac: request.body.fechaNac
            }
        })
    }
    //Extraer los datos del usuario 
    // Extraer los datos del usuario 
    const { nombre, email, password ,fechaNac} = request.body;
    // Ajustar la fecha con Moment.js para evitar desajustes de zona horaria
    
    ///verificar que el usuario no existe previamente en la bd
    const existingUser = await newUser.findOne({where: {email}})
    if (existingUser) {
        return response.render('auth/register',{
            page: 'Crear cuenta',
            csrfToken : request.csrfToken(),
            errors: [{msg: 'El usuario ya está registrado'}],
            user: {
                nombre: request.body.nombre,
                email: request.body.email,
                fechaNac: request.body.fechaNac
            }
        })
    }
    console.log("Registrando un nuevo usuario")
    console.log(request.body)


    


    //Registramos los datos en la base de datos
    const user = await newUser.create({
        nombre,
        fechaNac,
        email,
        password,
        token: generateId()
    })
    ;
    //Enviar mensaje de confirmacion
    emailRegister({
        name: user.nombre,
        email: user.email,
        token: user.token
    })
    
    //verificar si el toen es valido



    response.render('templates/message',{
        page: 'Cuenta creada satisfactoriamente. ',
        msg: 'Hemos enviado un correo a: ',
        email: email,
        msg2:', para la confirmación de cuenta'

    })

    //response.json(result.array())
    //const user = await newUser.create(request.body)
    //response.json(newUserr)
}

const formularioPasswordRecovery = (request,response)=>{
    response.render('auth/passwordRecovery',{
        page: 'Recupera tu contraseña',
        csrfToken : request.csrfToken()
        
    })
}

const resetPassword = async (request, response)=>{
    //Validacion de los campos que se reciben en el formulario
    
    await check('email').notEmpty().withMessage("El correo electronico es un campo obligatirio").isEmail().withMessage("El correo electronico no tiene el formato de: usuraio@dominio.extension").run(request)
   
    
    let result = validationResult(request)

    //verificamos si hay errores de validacion
    if(!result.isEmpty()){
        //errores
        return response.render('auth/passwordRecovery',{
            page: 'Recupera tu contraseña',
            csrfToken : request.csrfToken(),
            errors: result.array()
        })
    }

    //Buscar al usuario
    const{email} = request.body
    const user = await newUser.findOne({where: {email}})
    if(!user){
        return response.render('auth/passwordRecovery',{
            page: 'Recupera tu contraseña',
            csrfToken : request.csrfToken(),
            errors: [{msg: 'El email no pertenece a ningun usuario'}]
        })
    }
    //generar token y enviar correo
    user.token = generateId()
    await user.save()

    //Enviar un email
    //renderizar un mensaje
}

//FUnción que comprueba una cuenta
const confirm = async (request,response) =>{
    //ValidarToken - Si existe
    //confirmar cuenta
    //enviar mensaje
    const {token} = request.params
    //console.log(`Intentando confirmar la cuneta con el token: ${token}`)
    const user = await newUser.findOne({where: {token}})
    if (!user){
        response.render('auth/confirm',{
            page: 'El token no existe ó ya fue utilizado',
            msg: 'Porfavor verifica la liga, ya que el token no existe, si aun no puedes acceder puedes recuperar tu contraseña aquí : ',
            error:true
        }) 
    }else{
        //confirmar cuenta 
        user.token= null
        user.confirmado=true
        await user.save()

        response.render('auth/confirm',{
            page: 'Excelente..!',
            msg: 'Tu cuenta ha sido confirmada de manera exitosa ',
            error:false
        }) 
    }
    
}


export{
    formularioLogin,
    login,
    formularioRegister,
    register,
    confirm,
    formularioPasswordRecovery,
    resetPassword
}