const recipe = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 30],
          msg: 'Title must be 3 to 30 characters long'
        },
        notEmpty: true,
      }
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    upvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    favorites: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    recipePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews'
    });
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId'
    });
  };


  return Recipe;
};

export default recipe;
