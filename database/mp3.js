


module.exports=function(sequelize,Sequelize){
    const Mp3 = sequelize.define("mp3", {
        fileName: Sequelize.STRING,
        path: Sequelize.STRING,
        remotePath:Sequelize.STRING
      });
     
    return  Mp3  
    
}


