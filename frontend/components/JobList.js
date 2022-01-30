import { useQuery } from '@apollo/client'
import { GET_ALL_JOBS } from '../lib/queries/getAllJobs'
import Link from 'next/link';

export default function JobList() {
    const { loading, error, data } = useQuery(GET_ALL_JOBS)

    if (error) return <div>Error loading jobs.</div>
    if (loading) return <div>Loading</div>

    return (
        <section>
            {data.jobs.map(job => (
                <p key={job.id}><Link href={`/jobs/${job.id}`}>{job.title}</Link></p>
            ))}
        </section>
    )
}