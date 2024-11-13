 import { DataTypes } from "sequelize";
 import bcrypt from "bcrypt"
 import db from'../db/config.js'
 const newUser = db.define('tbb_user',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
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
        beforeCreate: async function (user) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
 }
)

 export default newUser