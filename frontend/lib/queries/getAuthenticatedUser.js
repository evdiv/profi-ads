import { gql } from "@apollo/client"

export const GET_AUTHENTICATED_USER = gql`
        query GET_AUTHENTICATED_USER {
            authenticatedItem {
                ... on User {
                    id
                    email
                    name
                    occupation {
                        id
                        title
                    }
                }
            }
        }
    `