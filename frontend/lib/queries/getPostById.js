import { gql } from '@apollo/client';

export const GET_POST_BY_ID = gql`
        query GET_POST_BY_ID($id: ID!) {
            post(where: {id: $id}) {
                title
            }
        }`