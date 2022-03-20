import { gql } from "@apollo/client"

export const GET_MY_JOBS = gql`
        query MY_JOBS_QUERY($userId: ID!, $skip: Int = 0, $take: Int) {
            jobs(where: {user: {id: {equals: $userId}}}, take: $take, skip: $skip) {
                id,
                title,
                publishedDate,
                departments {
                    id,
                    name
                },
                responses {
                    id
                    description,
                    publishedDate
                }
            }
            jobsCount(where: {user: {id: {equals: $userId}}})
        }
    `

export const initialVars = {
    userId: 0,
    skip: 0,
    take: process.env.jobsPerPage,
}    