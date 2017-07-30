import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default {
  User: {
    TodoLists: ({ id }, args, { models }) => 
      models.TodoList.findAll({
        where: {
          owner: id,
        },
      }),
    todoitems: ({ id }, args, { models }) => 
      models.TodoItem.findAll({
        where: {
          creatorId: id,
        },
      }),
  },
  TodoList: {
    todoitems: ({ id }, args, { models }) => 
      models.TodoItem.findAll({
        where: {
          todolistId: id,
        },
      }),
  },
  TodoItem: {
    creator: ({ creatorId }, args, { models }) =>
      models.User.findOne({
        where: {
          id: creatorId,
        },
      }),
  },
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    me: (parent, args, { models, user }) => {
      if (user) {
        return models.User.findOne({
          where: {
            id: user.id,
          },
        });
      }
      return null;
    },
    userTodoLists: (parent, { owner }, { models }) =>
      models.TodoList.findAll({
        where: {
          owner,
        },
      }),
    userTodoItems: (parent, { creatorId }, { models }) =>
      models.TodoItem.findAll({
        where: {
          creatorId,
        },
      }),
  },

  Mutation: {
    login: async (parent, { email, password }, { models, APP_SECRET }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error('username doesnt exist');
      }
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }
      const token = jwt.sign(
        {
          user: _.pick(user, ['id', 'username']),
        },
        APP_SECRET,
        {
          expiresIn: '1y',
        }
      );
      return token;
    },
    register: async (parent, args, { models }) => {
      const user = args;
      user.password = await bcrypt.hash(user.password, 12);
      return models.User.create(user);
    },
    updateUser: (parent, { username, newUsername }, { models }) =>
      models.User.update({ username: newUsername }, { where: { username } }),
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args }),
    createTodoList: (parent, args, { models }) => models.TodoList.create(args),
    createTodoItem: (parent, args, { models }) => models.TodoItem.create(args),
  },
};
