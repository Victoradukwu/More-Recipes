
const userProfileMigration = {
  /**
   * create USERPROFILE table
   * 
   * @param {any} queryInterface 
   * @param {any} Sequelize 
   */
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('UserProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
      },
      profilePicture: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('UserProfiles');
  },
};

export default userProfileMigration;
