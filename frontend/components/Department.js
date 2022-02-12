import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { GET_DEPARTMENT_BY_ID } from "../lib/queries/getDepartmentById"

export default function Department({initial}) {
    const { loading, error, data } = useQuery(GET_DEPARTMENT_BY_ID, 
        {
            variables: initial
        }
    )

    const { department, department: { jobs }, department: { specialists }} = data

    if (error) return <div>Error loading department.</div>
    if (loading) return <div>Loading</div>

    return (
        <div>
            <h3>{department.name}</h3>
            <h4>Recent Jobs</h4>
            {jobs && jobs.map(job => (
                <p key={job.id}><Link href={`/jobs/${job.id}`}>{job.title}</Link></p>
            ))}
            <p><Link href="/jobs">See all</Link> {department.jobsCount} jobs in the <b>{department.name}</b></p>

            <h4>Recent Specialists</h4>
            {specialists && specialists.map(spec => (
                <p key={spec.id}><Link href={`/specialists/${spec.id}`}>{spec.title}</Link></p>
            ))}
            <p>See all {department.specialistsCount} specialists in the <b>{department.name}</b></p>

        </div>
    )
}