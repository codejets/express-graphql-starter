import Sequelize from 'sequelize';

const sequelize = new Sequelize('pomoapp_test', 'test', 'test', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {
  User: sequelize.import('./user'),
  TodoList: sequelize.import('./todolist'),
  TodoItem: sequelize.import('./todoitem'),
};

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
