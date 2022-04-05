import { useState, useEffect } from 'react'
import { useQuery, NetworkStatus, useMutation } from '@apollo/client'
import { GET_MY_JOBS, initialVars} from '../lib/queries/getMyJobs'
import { DELETE_JOB_MUTATION } from '../lib/mutations/deleteJob'
import { useUser } from './useUser'
import Link from 'next/link'

export default function MyJobList() {
    const [jobId, setJobId] = useState(0)
    const user = useUser()
    const variables = { ...initialVars, userId: user?.id ? user?.id : 0}

    useEffect(() => {
        if (parseInt(jobId) > 0){
            deleteJob()
        }

    }, [jobId])

    const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_MY_JOBS, 
        { 
            variables,
            notifyOnNetworkStatusChange: true,
        })

    const [deleteJob] = useMutation(DELETE_JOB_MUTATION, {
        variables: {jobId }, 
        refetchQueries: [{ query: GET_MY_JOBS, variables }],
    })

    const loadingMoreJobs = networkStatus === NetworkStatus.fetchMore 
    
    let jobs = data?.jobs ? data?.jobs : []
    let jobsCount = data?.jobsCount ? data?.jobsCount : 0

    let areMoreJobs = jobs.length < jobsCount

    const loadMoreJobs = () => {
        fetchMore({
            variables: {
                skip: jobs.length,
            },
        })
    }  

    if (error) return <div>Error loading your jobs.</div>
    if (loading && !loadingMoreJobs) return <div>Loading</div>

    return (
        <section>
            {jobs.map(job => (
                <p key={job.id}>
                    <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                    <span onClick={() => setJobId(job.id)}>[X]</span>
                </p>
            ))}

            {areMoreJobs && (
                <button onClick={() => loadMoreJobs()} disabled={loadingMoreJobs}>
                    {loadingMoreJobs ? 'Loading...' : 'Show More'}
                </button>
            )}

        </section>
    )
}