import { gql } from "@apollo/client"
import client from "../../helpers/apollo-client"

export default function Post(){
    return (
        <div>Here will be a single post</div>
    )
}

export async function getStaticPaths(){
    const { data } = await client.query({
        query: gql`
            query {
                posts {
                    id
                }
            }
        `,
    })

    const paths = data.posts.map((post) => ({
        params: {
            id: post.id
        }
    }))

    return {paths, fallback: false}
}