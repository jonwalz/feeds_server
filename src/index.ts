// Gather the environment variables and make them available to the process
// import dotenv from "dotenv";
// dotenv.config();
import { ApolloServer, gql } from "apollo-server";
import schema from "./modules/schema_index";
import resolvers from "./modules/resolver_index";

const server = new ApolloServer({
    resolvers,
    schema,
    playground: true,
    introspection: true,
});

interface Server {
    readonly url: string;
}

server.listen().then(({ url }: Server ) => {
  console.log(`🚀  Server ready at ${url}`);
});
