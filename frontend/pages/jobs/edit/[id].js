import EditJob from "../../../components/EditJob"
import { initializeApollo, addApolloState } from "../../../lib/apolloClient"
import { GET_DEPARTMENTS } from "../../../lib/queries/getDepartments"

export default function EditJobPage({id}) {
    return (
        <div>
            <EditJob id={id}/>
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