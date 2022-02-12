import DepartmentList from "../../components/DepartmentList"
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { GET_DEPARTMENTS } from "../../lib/queries/getDepartments"

export default function DepartmentListPage() {
    return (
        <div>
            <h3>List of Departments</h3>
            <DepartmentList />
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