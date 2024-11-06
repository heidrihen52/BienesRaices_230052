import  Sequelize  from "sequelize"

const db = new Sequelize('bienes_raices_230052','adrian.jimenez','1234',{
    host: 'localhost',
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