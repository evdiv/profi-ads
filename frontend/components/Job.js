import { useQuery } from '@apollo/client'
import { GET_JOB_BY_ID } from "../lib/queries/getJobById"
import { DocumentRenderer } from '@keystone-6/document-renderer';

export default function Post({id}) {
    const { loading, error, data } = useQuery(GET_JOB_BY_ID, 
        {
            variables: { id }
        }
    )

    if (error) return <div>Error loading posts.</div>
    if (loading) return <div>Loading</div>

    return (
        <div>
            <h4>{data.job.title}</h4>
            <p><DocumentRenderer document={data.job.content.document} /></p>
            <p><i>Published on {data.job.publishedDate}</i></p>
        </div>

    )
}