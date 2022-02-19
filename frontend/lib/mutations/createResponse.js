import { gql } from "@apollo/client"

export const CREATE_RESPONSE_MUTATION = gql`
        mutation CREATE_RESPONSE_MUTATION($description:String!,  
        $job: JobRelateToOneForCreateInput) {
                    createResponse(data: { 
                    description: $description, 
                    job: $job}) {
                        description
                        publishedDate
                        user {
                            name
                        }
                    }
                }
            `