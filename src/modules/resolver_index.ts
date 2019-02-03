import djs from "./djs/djs_resolvers";
import feed from "./feed/feed_resolvers";

const resolvers = {
    Mutation: {
        postDj: djs.postDj,
    },
    RootQuery: {
        dj: djs.getDj,
        djs: djs.getDjs,
        feed: feed.getFeed,
    },
};

export default resolvers;
