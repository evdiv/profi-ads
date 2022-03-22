import { useQuery, NetworkStatus } from '@apollo/client'
import { GET_JOB_RESPONSES, initialVars } from '../lib/queries/getJobResponses';

export default function ResponseList({ jobId }) {
    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        GET_JOB_RESPONSES,
        {
            variables: {...initialVars, jobId },
            notifyOnNetworkStatusChange: true,
        })

    const loadingMoreResponses = networkStatus === NetworkStatus.fetchMore
    let { responses, responsesCount } = data
    let areMoreResponses = responses.length < responsesCount 

    const loadMoreResponses = () => {
        fetchMore({
            variables: {
                skip: responses.length,
            },
        })
    }  

    if (error) return <div>Error loading responses.</div>
    if (loading && !loadingMorePosts) return <div>Loading</div>

    return (
        <section>
            <ul>
                {data.responses.map((resp) => (
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

        </section>
    )
}