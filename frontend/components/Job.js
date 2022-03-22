import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_JOB_BY_ID } from "../lib/queries/getJobById"
import { useUser } from "./useUser";
import ResponsesList from "./ResponsesList"
import CreateSpecialist from "./CreateSpecialist"
import CreateResponse from "./CreateResponse";


export default function Job({id}) {
    const user = useUser()

    const { loading, error, data } = useQuery(GET_JOB_BY_ID, {
            variables: { id }
        }
    )

    if (error) return <div>Error loading job.</div>
    if (loading) return <div>Loading</div>


    return (
        <div>
            {data.job.departments.map(dep => (
                <span key={dep.id} style={{display: "inline-block", margin: 10}}>
                    <Link href={`/departments/${dep.id}`}>{dep.name}</Link>
                </span>
            ))}

            <h4>{data.job.title}</h4>
            <p>{data.job.description}</p>
            <p><i>Published by {data.job.user?.name} on {data.job.publishedDate}</i></p>

            {user?.id === data.job.user.id 
                ? <ResponsesList jobId={id} />
                : user?.occupation
                    ? <CreateResponse jobId={id} />
                    : user?.id
                        ? <CreateSpecialist />
                        : <div><Link href="/account/signIn">Sign In</Link> or <Link href="/account/register">Register</Link></div>}

        </div>

    )
}