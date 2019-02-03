const { makeExecutableSchema } = require("apollo-server")
const Djs = require('./djs/djs_schema')
const Feed = require('./feed/feed_schema')
const resolvers = require('./resolver_index')

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
`
module.exports = makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        RootQuery,
        Djs,
        Feed
    ],
    resolvers
})
