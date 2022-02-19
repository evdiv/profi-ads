import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import Link from 'next/link';
import { useUser } from "../../components/useUser";
import Job from "../../components/Job"
import CreateSpecialist from "../../components/CreateSpecialist"
import CreateResponse from "../../components/CreateResponse";
import { GET_JOB_BY_ID } from "../../lib/queries/getJobById"
import { GET_DEPARTMENTS } from "../../lib/queries/getDepartments"

export default function SingleJobPage({id}) {
    const user = useUser()
    return (
        <div>
            <Job id={id}/>
            {user?.occupation 
                ? <CreateResponse jobId={id}/> 
                : user?.id 
                    ? <CreateSpecialist /> 
                    : <div><Link href="/account/signIn">Sign In</Link> or <Link href="/account/register">Register</Link></div>}
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