import { ApolloServer } from './schema/node_modules/apollo-server';

import { typeDefs } from './schema/schema';
import { resolvers } from './resolver/resolver';

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});