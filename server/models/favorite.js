const favorite = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {

    category: {
      type: DataTypes.STRING
    }
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };


  return Favorite;
};

export default favorite;
