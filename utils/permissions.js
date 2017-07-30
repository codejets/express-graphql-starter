/*
Refer https://github.com/thebigredgeek/apollo-resolvers for more resolvers and usecases
*/
const createResolver = (resolver) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context) => {
      await resolver(parent, args, context);
      return childResolver(parent, args, context);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

export const isAuthenticated = createResolver((parent, args, context) => {
  if (!context.user) {
    throw new Error('Not Authenticated');
  }
});

export default createResolver;
