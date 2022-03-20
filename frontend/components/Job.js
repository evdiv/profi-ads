import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_JOB_BY_ID } from "../lib/queries/getJobById"

export default function Job({id}) {
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
            <p><i>Published on {data.job.publishedDate}</i></p>
        </div>

    )
}