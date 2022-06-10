import { useQuery, NetworkStatus } from '@apollo/client'
import { useUser } from './useUser'
import { GET_PUBLIC_JOB_RESPONSES, initialVars } from '../lib/queries/getPublicJobResponses';
import { GET_PRIVATE_JOB_RESPONSES } from '../lib/queries/getPrivateJobResponses';
import CreateResponse from './CreateResponse'
import AcceptOffer from './AcceptOffer'

export default function ResponseList({ jobId, ownerId, contractorId }) {
    const user = useUser()

    const jobResponsesQuery = (user.id === ownerId) ? GET_PRIVATE_JOB_RESPONSES : GET_PUBLIC_JOB_RESPONSES

    const { loading, error, data, fetchMore, refetch, networkStatus } = useQuery(jobResponsesQuery,
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
                        {resp.description} 
                        <span style={{display: 'inline-block', color: '#999', marginLeft: 5, fontSize: 12}}> 
                            added by {resp.user.id === ownerId ? 'Owner' : resp.user.name} on {resp.publishedDate}
                        </span>

                        {!contractorId && user.id === ownerId && resp.user.id !== ownerId 
                            && <AcceptOffer jobId={jobId} userId={resp.user.id} refetch={refetch}/>}

                        {contractorId && contractorId === resp.user.id 
                            && <span style={{color: 'green', fontWeight: 'bold'}}> Accepted</span>}
                    </li>
                ))}
            </ul>

            {areMoreResponses && (
                <button onClick={() => loadMoreResponses()} disabled={loadingMoreResponses}>
                    {loadingMoreResponses ? 'Loading...' : 'Show More'}
                </button>
            )}

            {!contractorId && <CreateResponse jobId={jobId} isOwner={ownerId === user.id} refetch={refetch}/>}
        </section>
    )
}