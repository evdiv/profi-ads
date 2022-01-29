import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:3000/api/graphql",
    }),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined'
})

export default apolloClient