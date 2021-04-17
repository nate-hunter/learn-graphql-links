const { ApolloServer } = require('apollo-server');

const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`

const links = [{
    id: 'link-00',
    description: 'Where to start to learn GraphQL',
    url: 'www.howtographql.com'
}]

const resolvers = {
    Query: {
        info: () => `This is an app to help manage and track learning GraphQL.`,
        feed: () => links,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen(4005) 
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    )