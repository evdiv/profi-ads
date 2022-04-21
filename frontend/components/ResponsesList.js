import { useQuery, NetworkStatus } from '@apollo/client'
import { useUser } from './useUser'
import { GET_RELEVANT_JOB_RESPONSES, initialVars } from '../lib/queries/getJobResponses';
import CreateResponse from './CreateResponse'

export default function ResponseList({ jobId, ownerId }) {
    const user = useUser()

    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        GET_RELEVANT_JOB_RESPONSES,
        {
            variables: { ...initialVars, jobId, ownerId, profiId: user.id },
            notifyOnNetworkStatusChange: true,
        })

    const loadingMoreResponses = networkStatus === NetworkStatus.fetchMore
    let areMoreResponses = data?.responses && data.responses.length < data.responsesCount ? true : false

    const loadMoreResponses = () => {
        fetchMore({
            variables: {
                skip: data.responses.length,
            },
        })
    }  

    if (error) return <div>Error loading responses.</div>
    if (loading && !loadingMoreResponses) return <div>Loading</div>

    return (
        <section>
            <ul>
                {data?.responses && data.responses.map((resp) => (
                    <li key={resp.id}>
                        {resp.description} added by {resp.user.name} on {resp.publishedDate}
                    </li>
                ))}
            </ul>
            {areMoreResponses && (
                <button onClick={() => loadMoreResponses()} disabled={loadingMoreResponses}>
                    {loadingMoreResponses ? 'Loading...' : 'Show More'}
                </button>
            )}
            <CreateResponse jobId={jobId} />  
        </section>
    )
}