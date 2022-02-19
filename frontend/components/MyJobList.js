import { useQuery, NetworkStatus } from '@apollo/client'
import { GET_MY_JOBS, initialVars} from '../lib/queries/getMyJobs'
import Link from 'next/link';

export default function JobList() {
    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        GET_MY_JOBS, 
        { 
            variables: initialVars,
            notifyOnNetworkStatusChange: true,
        })

    const loadingMoreJobs = networkStatus === NetworkStatus.fetchMore 
    
    let { jobs, jobsCount } = data
    let areMoreJobs = jobs.length < jobsCount

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