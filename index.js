// Gather the environment variables and make them available to the process
require('dotenv').config();
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var schema = require('./modules/schema_index');
var resolvers = require('./modules/resolver_index');
var server = new ApolloServer({
    schema: schema,
    resolvers: resolvers
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
