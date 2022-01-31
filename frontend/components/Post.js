import { useQuery } from '@apollo/client'
import { GET_POST_BY_ID } from "../lib/queries/getPostById"

export default function Post({id}) {
    const { loading, error, data } = useQuery(GET_POST_BY_ID, 
        {
            variables: { id }
        }
    )

    if (error) return <div>Error loading posts.</div>
    if (loading) return <div>Loading</div>

    return (
        <div>
            {data.post.title}
        </div>

    )
}