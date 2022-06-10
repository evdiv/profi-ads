import { gql } from "@apollo/client"

export const ACCEPT_OFFER_MUTATION = gql`
        mutation ACCEPT_OFFER_MUTATION(
            $jobId: ID!,
            $userId: ID!) {
                updateJob(
                    where: { 
                        id: $jobId
                    }, 
                    data: {
                        contractor: { connect: { id: $userId } }
                    }){
                        id
                    }
                }
            `