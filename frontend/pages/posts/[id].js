import { gql } from "@apollo/client"
import client from "../../helpers/apollo-client"

export default function Post({data}){
    return (
        <div>
            {data.title}
        </div>

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

export async function getStaticProps({ params }) {
    const { id } = params
    const { data } = await client.query({
        query: gql`query {
                    post(where: {id: ${id}}) {
                        title
                    }
                }`
    })

    return {
        props: {
            data: data.post,
        },
    };

}