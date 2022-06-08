import { gql } from "@apollo/client"

export const EDIT_JOB_MUTATION = gql`
        mutation EDIT_JOB_MUTATION(
            $jobId: ID!,
            $title: String!, 
            $description:String!, 
            $departments: DepartmentRelateToManyForUpdateInput) {
                updateJob(
                    where: { 
                        id: $jobId
                    }, 
                    data: {
                        title: $title, 
                    	description: $description, 
                    	departments: $departments
                    }){
                        id,
                        title,
                        description,
                        publishedDate
                    }
                }
            `