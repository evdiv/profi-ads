import PostList from "../../components/PostList"
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { GET_ALL_POSTS, initialVars } from "../../lib/queries/getAllPosts"

export default function PostListPage() {
    return (
        <div>
            <h3>Recent Posts</h3>
            <PostList />
        </div>
    )
}

export async function getServerSideProps() {
    
    const apolloClient = initializeApollo()
    await apolloClient.query({ query: GET_ALL_POSTS, variables: initialVars})

    return addApolloState(apolloClient, {
        props: {},
    })
}