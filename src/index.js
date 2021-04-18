const { ApolloServer } = require('apollo-server');
const fs = require('fs')
const path = require('path')


// ADDING MUTATIONS:
// [x] Extend the schema definition
// [x] Refacter schema to a new file (and adjust the GraphQLServer instance)
// [x] Implement the resolver function
// [x] Test Mutation
// [] Add CRUD


let links = [{
    id: 'link-0',
    description: 'Where to start to learn GraphQL',
    url: 'www.howtographql.com'
},
{
    id: 'link-1',
    description: 'GraphQL home base',
    url: 'www.graphql.org'
}
]

let linkIdCount = links.length

let linkFields = ['id', 'description', 'url'];

const resolvers = {
    Query: {
        info: () => `This is an app to help manage and track learning GraphQL.`,
        feed: () => links,
    },

    Mutation: {
        post: (parent, args) => {
            let link = {}
            linkFields.forEach(field => {
                if (field === 'id') {
                    link['id'] = `link-${linkIdCount++}`
                } else if (args[field]) {
                    link[field] = args[field]
                }
            });
            links.push(link)
            return link;
        },
        updateLink: (parent, args) => {
            let link = links.filter(link => link.id === args.id)[0]
            for (const key in args) {
                if (Object.hasOwnProperty.call(args, key) && key !== 'id') {
                    const element = args[key];
                    link[key] = element
                }
            }
            return link;
        },
        deleteLink: (parent, args) => {
            let deletedLink = links.find(deletedLink => deletedLink.id === args.id)
            const remainingLinks = links.filter(link => link.id !== deletedLink.id)
            links = remainingLinks;
            return deletedLink;
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server
    .listen(4005) 
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    )