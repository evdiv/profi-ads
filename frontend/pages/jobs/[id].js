import Job from "../../components/Job"
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { useUser } from "../../components/useUser";
import CreateSpecialist from "../../components/CreateSpecialist"
import { GET_JOB_BY_ID } from "../../lib/queries/getJobById"
import { GET_DEPARTMENTS } from "../../lib/queries/getDepartments"

export default function SingleJobPage({id}) {
    const user = useUser()
    return (
        <div>
            <Job id={id}/>
            {user?.occupation 
                ? <div>Respond to Job</div> 
                : user?.id 
                    ? <CreateSpecialist userId={user.id} />
                    : <div>Please register</div>}
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