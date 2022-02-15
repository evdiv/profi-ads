import { useQuery } from '@apollo/client'
import { GET_JOB_BY_ID } from "../lib/queries/getJobById"
import { useUser } from "./useUser";

export default function Job({id}) {
    const user = useUser();
    const { loading, error, data } = useQuery(GET_JOB_BY_ID, 
        {
            variables: { id }
        }
    )

    if (error) return <div>Error loading job.</div>
    if (loading) return <div>Loading</div>

    return (
        <div>
            <h4>{data.job.title}</h4>
            <p>{data.job.description}</p>
            <p><i>Published on {data.job.publishedDate}</i></p>
            {user?.occupation 
            ?
            <div></div>
            :
            <div>Register as Specialist to answer to this job</div>
            }
        </div>

    )
}