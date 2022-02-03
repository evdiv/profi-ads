import { gql } from "@apollo/client"

export const SIGNUP_MUTATION = gql`
        mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
            createUser(data: { email: $email, name: $name, password: $password }) {
                id,
                email,
                name
            }
        }
    `