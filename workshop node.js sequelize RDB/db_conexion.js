const Sequelize = require('sequelize');
const path = 'mysql://root@localhost:3306/test';
const sequelize = new Sequelize(path);

sequelize.authenticate().then(()=>{
    console.log('conectado...')
}).catch(err=>console.error(err));

module.exports=sequelize;


