import { gql } from "@apollo/client"

export const GET_RELEVANT_JOB_RESPONSES = gql`
        query RELEVANT_JOB_RESPONSES_QUERY(
            $jobId: ID!, 
            $ownerId: ID!, 
            $profiId: ID!, 
            $skip: Int = 0, 
            $take: Int) 
            { responses(
                where: {
                    job: {id: {equals: $jobId}}, 
                    user: {id: {in:[$ownerId, $profiId]}}
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
    ownerId: 0,
    profiId: 0, 
    skip: 0,
    take: process.env.jobsResponsesPerPage,
}    