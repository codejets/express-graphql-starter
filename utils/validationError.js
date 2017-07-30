import { GraphQLError } from 'graphql';

export default class ValidationError extends GraphQLError {
  constructor(errors) {
    super('The request is invalid.');
    errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        Object.defineProperty(result, error.key, {
          value: [error.message],
          enumerable: true,
        });
      }
      return result;
    }, {});
  }
}
