import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import Job from "../../components/Job"
import { GET_JOB_BY_ID } from "../../lib/queries/getJobById"
import { GET_DEPARTMENTS } from "../../lib/queries/getDepartments"

export default function SingleJobPage({id}) {
    return (
        <div>
            <Job id={id}/>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const id = params.id
    const apolloClient = initializeApollo()

    await apolloClient.query({ query: GET_DEPARTMENTS })
    await apolloClient.query({ 
        query: GET_JOB_BY_ID,
        variables: {id}
    })

    return addApolloState(apolloClient, {
        props: {id},
    })    
}