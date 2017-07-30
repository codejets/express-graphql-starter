export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    // 1 to many with todoList
    User.hasMany(models.TodoList, {
      foreignKey: 'owner',
    });
    // 1 to many with TodoItem
    User.hasMany(models.TodoItem, {
      foreignKey: 'creatorId',
    });
  };

  return User;
};
