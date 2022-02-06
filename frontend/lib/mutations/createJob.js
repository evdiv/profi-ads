import { gql } from "@apollo/client"

export const CREATE_JOB_MUTATION = gql`
        mutation CREATE_JOB_MUTATION($title: String!, 
        $description:String!, 
        $departments: DepartmentRelateToManyForCreateInput) {
                    createJob(data: { 
                    title: $title, 
                    description: $description, 
                    departments: $departments}) {
                        id,
                        title,
                        publishedDate
                    }
                }
            `