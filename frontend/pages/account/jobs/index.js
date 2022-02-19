import MyJobList from '../../../components/MyJobList'
import { initializeApollo, addApolloState } from '../../../lib/apolloClient'
import { GET_MY_JOBS, initialVars } from '../../../lib/queries/getMyJobs'

export default function MyJobListPage() {
    return (
        <div>
            <h3>My Jobs</h3>
            <MyJobList />
        </div>
    )
}

export async function getServerSideProps() {
    
    const apolloClient = initializeApollo()
    await apolloClient.query({ query: GET_MY_JOBS, variables: initialVars })

    return addApolloState(apolloClient, {
        props: {},
    })
}