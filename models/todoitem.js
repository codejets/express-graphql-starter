export default (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('todoitem', {
    text: DataTypes.STRING,
  });

  return TodoItem;
};
