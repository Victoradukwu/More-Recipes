const vote = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    
    voteType: {
      type: DataTypes.ENUM('up', 'down'),
      allowNull: false,
    }
  });    
    
  Vote.associate = models => {  
        Vote.belongsTo(models.Recipe, {
          foreignKey: 'recipeId',
          onDelete: 'CASCADE'
        });
        Vote.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });      
    };
  
  return Vote;
};

export default vote;
