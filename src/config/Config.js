module.exports = {
    development: {
        database:{
            host: 'localhost',
            port: 3306,
            name: 'csm',
            dialect:'mysql',
            user: 'root',
            password: ''
        }
    },
    production:{
        database:{
         host:process.env.BD_HOST,
         port:process.env.DB_PORT
 
         } 
     }
 };