import CreateJob from "../../components/CreateJob"
import { initializeApollo, addApolloState } from "../../lib/apolloClient"
import { GET_DEPARTMENTS } from "../../lib/queries/getDepartments"

export default function CreateJobPage() {
    return (
        <div>
            <CreateJob />
        </div>
    )
}

export async function getServerSideProps() {

    const apolloClient = initializeApollo()
    await apolloClient.query({ query: GET_DEPARTMENTS })

    return addApolloState(apolloClient, {
        props: {},
    })
}