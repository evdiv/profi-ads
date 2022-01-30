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

// export async function getStaticPaths(){
//     const { data } = await client.query({
//         query: gql`
//             query {
//                 posts {
//                     id
//                 }
//             }
//         `,
//     })

//     const paths = data.posts.map((post) => ({
//         params: {
//             id: post.id
//         }
//     }))

//     return {paths, fallback: false}
// }

export async function getServerSideProps({ params }) {
    const id = params.id
    const apolloClient = initializeApollo()

    await apolloClient.query({ 
        query: GET_POST_BY_ID,
        variables: {id: 2}
    })

    return addApolloState(apolloClient, {
        props: {id},
    })    
}