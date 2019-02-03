import { makeExecutableSchema } from "apollo-server";
import Djs from "./djs/djs_schema";
import Feed from "./feed/feed_schema";
import resolvers from "./resolver_index";

const RootQuery = `
# Comments in GraphQL are defined with the hash (#) symbol.
    type RootQuery {
        djs: [DJ]!
        dj(username: String!): DJ
        feed(username: String!): [Show]
    }
`;

const SchemaDefinition = `
    schema {
        query: RootQuery
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
    resolvers,
    typeDefs: [
        Feed,
        RootQuery,
        SchemaDefinition,
        Djs,
    ],
});
