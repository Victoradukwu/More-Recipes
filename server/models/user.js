import bcrypt from 'bcrypt';

  const Model = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,      
    }
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists',
      },
      validate: {
        len: {
          args: [3, 20],
          msg: 'Username must be minimum 3 and maximum 20'
        },
        notEmpty: {
          args: true,
          msg: 'Please specify a username.'
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          arg: true,
          msg: 'Please enter a valid email address',
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          min: 5,
        },
      },
    },
  }//closes attributes
  
   {
    hooks: {
      beforeCreate: (user) => {
        const saltRounds = 8;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      },
      beforeUpdate: (user) => {
        const saltRounds = 8;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      },
    },  //hookes
  }   //options
});
  
  User.associate = models =>{
    User.hasMany(models.Recipe, {
          foreignKey: 'userId',
          as: 'recipes'
        });
    User.hasMany(models.Review, {
          foreignKey: 'userId',
          as: 'reviews'
        });
    User.hasMany(models.Favorite, {
          foreignKey: 'userId',
          as: 'favoriteRecipes'
        }); 
    User.hasOne(models.UserProfile); 
      };  
  
  return User;
};

export default user;
