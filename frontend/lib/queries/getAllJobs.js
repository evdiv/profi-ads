import { gql } from "@apollo/client"

export const GET_ALL_JOBS = gql`
        query ALL_JOBS_QUERY($skip: Int = 0, $take: Int) {
            jobs(take: $take, skip: $skip) {
                id,
                title,
                publishedDate
            }
            jobsCount
        }
    `

export const initialVars = {
    skip: 0,
    take: process.env.jobsPerPage,
}    