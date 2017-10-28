
const userprofile = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  });
  UserProfile.associate = models => {
    UserProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
  };
  return UserProfile;
};
export default userprofile;
