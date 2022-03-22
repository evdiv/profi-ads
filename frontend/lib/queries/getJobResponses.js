import { gql } from "@apollo/client"

export const GET_JOB_RESPONSES = gql`
        query ALL_JOB_RESPONSES_QUERY($jobId: Int, $skip: Int = 0, $take: Int) {
            responses(where: {job: {id: {equals: $jobId}}}, take: $take, skip: $skip) {
                id,
                description,
                publishedDate,
                user: {
                    id,
                    name
                }
            }
            responseCount(where:{job: {id: {equals: $jobId}}})
        }
    `

export const initialVars = {
    skip: 0,
    take: process.env.jobsResponsesPerPage,
}    