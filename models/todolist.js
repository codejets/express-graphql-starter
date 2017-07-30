export default (sequelize, DataTypes) => {
  const TodoList = sequelize.define('todolist', {
    name: DataTypes.STRING,
  });

  TodoList.associate = (models) => {
    // 1 to many with TodoItem
    TodoList.hasMany(models.TodoItem, {
      foreignKey: 'todolistId',
    });
  };

  return TodoList;
};
