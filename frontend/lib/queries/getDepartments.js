import { gql } from "@apollo/client"

export const GET_DEPARTMENTS = gql`
        query GET_DEPARTMENTS_QUERY {
            departments {
                id,
                name
            }
            departmentsCount
        }
    `