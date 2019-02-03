// Gather the environment variables and make them available to the process
require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server');
const schema = require('./modules/schema_index')
const resolvers = require('./modules/resolver_index')

const server = new ApolloServer({
  schema: schema,
  resolvers: resolvers,
});

interface Server {
    readonly url: string
}

server.listen().then(({ url }: Server ) => {
  console.log(`🚀  Server ready at ${url}`);
});
