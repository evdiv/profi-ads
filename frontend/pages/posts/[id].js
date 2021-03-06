import Post from "../../components/Post"
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { GET_POST_BY_ID } from "../../lib/queries/getPostById"

export default function SinglePostPage({id}) {
    return (
        <div>
            <Post id={id}/>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const id = params.id
    const apolloClient = initializeApollo()

    await apolloClient.query({ 
        query: GET_POST_BY_ID,
        variables: {id}
    })

    return addApolloState(apolloClient, {
        props: {id},
    })    
}