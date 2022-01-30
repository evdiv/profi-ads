import PostList from "../../components/PostList"
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { GET_ALL_POSTS } from "../../lib/queries/getAllPosts"

export default function PostListPage() {
    return (
        <div>
            <h3>Recent Posts</h3>
            <PostList />
        </div>
    )
}

export const getStaticProps = async () => {
    const apolloClient = initializeApollo()

    await apolloClient.query({ query: GET_ALL_POSTS })

    return addApolloState(apolloClient, {
        props: {},
    })
}