const djs = `
  type DJ {
    username: String
    display_name: String
    feed_url: String
  }

  type Mutation {
      postDj(id: String!): DJ
  }
`;

export default djs;
