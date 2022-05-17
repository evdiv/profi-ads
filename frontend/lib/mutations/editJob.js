import { gql } from "@apollo/client"

export const EDIT_JOB_MUTATION = gql`
        mutation EDIT_JOB_MUTATION($jobId: ID!) {
                    editJob(data: { 
                    title: $title, 
                    description: $description, 
                    departments: $departments}) {
                        id,
                        title,
                        publishedDate
                    }
                }
            `