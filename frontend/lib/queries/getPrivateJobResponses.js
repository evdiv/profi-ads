import { gql } from "@apollo/client"

export const GET_PRIVATE_JOB_RESPONSES = gql`
        query PRIVATE_JOB_RESPONSES_QUERY(
            $jobId: ID!, 
            $skip: Int = 0, 
            $take: Int) 
            { responses(
                where: {
                    job: {id: {equals: $jobId}}, 
                }, take: $take, skip: $skip) {
                id,
                description,
                publishedDate,
                user {
                    id,
                    name,
                }
            }
        }
    `

export const initialVars = {
    skip: 0,
    take: process.env.jobsResponsesPerPage,
}    