import JobList from "../../components/JobList"
import { useUser } from "../../components/useUser";
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { GET_ALL_JOBS, initialVars } from "../../lib/queries/getAllJobs"

export default function JobListPage({userId}) {
    return (
        <div>
            <h3>Available Jobs</h3>
            <JobList userId={userId} />
        </div>
    )
}

export async function getServerSideProps() {
    
    const user = useUser()
    initialVars.userId = user.id

    const apolloClient = initializeApollo()
    await apolloClient.query({ query: GET_ALL_JOBS, variables: initialVars })

    return addApolloState(apolloClient, {
        props: { userId: user.id},
    })
}