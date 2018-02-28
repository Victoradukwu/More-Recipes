const review = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Review;
};

export default review;
