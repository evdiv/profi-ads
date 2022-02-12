import Department from "../../components/Department"
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { GET_DEPARTMENT_BY_ID } from "../../lib/queries/getDepartmentById"

export default function SingleDepartmentPage(props) {
    return (
        <div>
            <Department initial={props}/>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const initial = {
        id: params.id,
        jobs: 20,
        specialists: 20
    }

    const apolloClient = initializeApollo()

    await apolloClient.query({ 
        query: GET_DEPARTMENT_BY_ID,
        variables: initial
    })

    return addApolloState(apolloClient, {
        props: initial,
    })    
}