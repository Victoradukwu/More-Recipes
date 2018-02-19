module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      ingredients: {
        type: Sequelize.STRING,
        allowNull: false
      },
      instructions: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      upvote: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      downvote: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      favorites: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      recipePicture: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
