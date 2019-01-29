


module.exports=function(sequelize,Sequelize){
    const user = sequelize.define("user", {
        userName: Sequelize.STRING,
        account: Sequelize.STRING,
        password:Sequelize.STRING
      });
     
    return  user  
    
}


