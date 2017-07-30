import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'jsonwebtoken';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Move this config to env variable when using docker
const APP_SECRET = 'DROP22';

const app = express();

const addUser = async (req) => {
  const token = req.headers.authorization;
  if (token) {
    const { user } = await jwt.verify(token, APP_SECRET);
    req.user = user;
  } else {
    req.user = null;
  }
  req.next();
};

app.use(addUser);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      APP_SECRET,
      user: req.user,
    },
  })),
);

models.sequelize.sync().then(() => app.listen(3000));
