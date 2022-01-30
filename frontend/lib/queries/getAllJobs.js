import { gql } from "@apollo/client"

export const GET_ALL_JOBS = gql`
        query ALL_JOBS_QUERY {
            jobs {
                id,
                title,
                publishedDate
            }
        }
    `