import { gql } from '@apollo/client';

export const GET_JOB_BY_ID = gql`
        query GET_JOB_BY_ID($id: ID!) {
            job(where: {id: $id}) {
                title,
                description,
                publishedDate
            }
        }`