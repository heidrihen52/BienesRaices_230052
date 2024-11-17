import nodemailer from 'nodemailer'

const emailRegister = async(data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  //console.log(data)
  const {email, name, token} = data
  
  //Enviar el email
  await transport.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject:'Confirma tu cuenta en BienesRaices.com',
    text: 'Confirma tu cuenta en BienesRaices.com',
    html:`<p>Hola ${nombre}, comprueba tu cuenta en bienes raices.com</p>
    <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:
    <a href="">Confirmar tu cuenta</a> </p>
    <p>Si tu no create esta cuenta, puedes ignorar el mensaje</p>`
    
  })

}





export{
    emailRegister
}