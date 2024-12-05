 import { DataTypes } from "sequelize";
 import bcrypt from "bcrypt"
 import db from'../db/config.js'
 const newUser = db.define('tbb_user',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNac:{
        type:DataTypes.DATEONLY     ,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
        
    },      
    token: DataTypes.STRING ,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks:{
        //generamos la clave para el haseho, se recomiendan 10 rondas de aleatorizacion para no consumir demasiados recursos de hardware y hacer lento el proceso
        beforeCreate: async function (user) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async function (user) {
            //verificar si existe un token y este confirmado

            //Generamos la clave para el hasheo
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt);
        }
        
    }
 }
)

 export default newUser