import { gql } from "@apollo/client"

export const DELETE_JOB_MUTATION = gql`
        mutation DELETE_JOB_MUTATION($jobId: ID!) {
                    deleteJob(where: { id: $jobId }) {
                        title,
                        publishedDate
                    }
                }
            `