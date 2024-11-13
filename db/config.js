import  Sequelize  from "sequelize"
import dotenv from 'dotenv'
dotenv.config({path:'.env'})

const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER , process.env.BD_PASS ,{
    host: process.env.BD_HOST ,
    port:'3307',
    dialect: 'mysql',
    define:{
        timestamps:true//que es
    },
    pool:{
        max:5,
        min:0,
        acquire:30000, //30 segundos para poder responser
        idle: 10000 //dormir la conexion si esta inactiva
    },
    operatorAliase:false
})

export default db;