import { gql } from "@apollo/client"

export const SIGNIN_MUTATION = gql`
        mutation SIGNIN_MUTATION($email: String!, $password: String!) {
            authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    email
                    name
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                message
                }
            }
        }
    `