const formularioLogin = (request,response)=>{
    response.render('auth/login',{
        
    })
}

const formularioRegister = (request,response)=>{
    response.render('auth/register',{
        page : "Crea una nueva cuenta"
    })
}
const formularioPasswordRecovery = (request,response)=>{
    response.render('auth/passwordRecovery',{
        
    })
}


export{
    formularioLogin,
    formularioRegister,
    formularioPasswordRecovery
}