const voteMigration = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipes',
          key: 'id',
          as: 'recipeId'
        }
      },
      voteType: {
        type: Sequelize.ENUM('up', 'down'),
        allowNull: false,
      },
    })
  down: queryInterface => queryInterface.dropTable('Votes')
};

export default voteMigration;
