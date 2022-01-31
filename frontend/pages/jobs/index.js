import JobList from "../../components/JobList"
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { GET_ALL_JOBS } from "../../lib/queries/getAllJobs"

export default function JobListPage() {
    return (
        <div>
            <h3>Available Jobs</h3>
            <JobList />
        </div>
    )
}

export async function getServerSideProps() {
    
    const apolloClient = initializeApollo()
    await apolloClient.query({ query: GET_ALL_JOBS })

    return addApolloState(apolloClient, {
        props: {},
    })
}