import { useQuery, NetworkStatus } from '@apollo/client'
import { GET_ALL_JOBS, initialVars} from '../lib/queries/getAllJobs'
import Link from 'next/link';

export default function JobList() {
    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        GET_ALL_JOBS, 
        { 
            variables: initialVars,
            notifyOnNetworkStatusChange: true,
        })

    const loadingMoreJobs = networkStatus === NetworkStatus.fetchMore 
    const { jobs, jobsCount } = data
    const areMoreJobs = jobs.length < jobsCount  

    const loadMoreJobs = () => {
        fetchMore({
            variables: {
                skip: jobs.length,
            },
        })
    }  

    if (error) return <div>Error loading jobs.</div>
    if (loading && !loadingMoreJobs) return <div>Loading</div>

    return (
        <section>
            {jobs.map(job => (
                <p key={job.id}><Link href={`/jobs/${job.id}`}>{job.title}</Link></p>
            ))}

            {areMoreJobs && (
                <button onClick={() => loadMoreJobs()} disabled={loadingMoreJobs}>
                    {loadingMoreJobs ? 'Loading...' : 'Show More'}
                </button>
            )}

        </section>
    )
}