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
    html:`
    <body style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; background-color: #f2f2f2; margin: 0; padding: 0;">
          <div class="header" style="text-align: center; padding: 20px; ;">
              <h1 style="font-size: 18px; color: #333; margin: 0;">BienesRaices</h1>
              <p style="font-size: 14px; color: #666; margin: 0;"><strong>Confirmación de correo</strong></p>
          </div>
          <div class="email-container" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <div class="content" style="padding: 20px;">
                  <h2 style="font-size: 16px; color: #333; margin-bottom: 10px;">Hola ${name},</h2>
                  <p style="text-align: justify; font-size: 14px; color: #666;">¡Gracias por registrarte en Bienes Raíces! Para completar el proceso de creación de tu cuenta y acceder a todos nuestros servicios, necesitamos que confirmes tu dirección de correo electrónico.</p>
                  <div class="changes" style="margin-top: 20px; background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
                      <h3 style="text-align: center; font-size: 16px; color: #333; margin: 0 0 10px;">Haz clic en el siguiente enlace para confirmar tu cuenta:</h3>
                      <ul style="list-style: none; text-align: center; padding: 0; margin: 0;">
                          <li><a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/usuario/confirm/${token}" style="font-size: 14px; color: #666; text-decoration: none;">Confirmar tu cuenta</a></li>
                      </ul>
                  </div>
                  <p style="text-align: justify; font-size: 14px; color: #666;">Si no reconoces esta solicitud o no creaste una cuenta, por favor ignora este mensaje. Gracias por elegir Bienes Raíces. ¡Estamos emocionados de ayudarte a encontrar la propiedad de tus sueños!</p>
                  <p style="text-align: center; font-size: 14px; color: #666;">Atentamente,</p>
                  <p style="text-align: center; font-size: 14px; color: #666;">Adrián Pérez Jiménez</p>
                  <p style="text-align: center;"><img src="../views/assets/" alt="Firma" style="height: 100px; width: 100px;"></p>
              </div>
              <div class="footer" style="text-align: center; font-size: 12px; color: #666; padding: 10px 20px; background-color: #f9f9f9; border-top: 1px solid #ddd;">
                  BienesRaices.com – Proyecto realizado por Adrián Pérez Jiménez<br>
                  <a href="https://github.com/heidrihen52" style="color: #666; text-decoration: none;">heidrihen52</a>
              </div>
          </div>
    </body>
    `
    
  })

}





export{
    emailRegister
}