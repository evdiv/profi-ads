import { gql } from '@apollo/client';

export const GET_DEPARTMENT_BY_ID = gql`
        query GET_DEPARTMENT_BY_ID($id: ID!, $jobs: Int!, $specialists: Int!) {
            department(where: {id: $id}) {
                name,
            	jobs(take: $jobs ) {
                    id,
              		title
            	},
            	jobsCount,
            	specialists(take: $specialists) {
                    id,
                    title
                },
                specialistsCount
            }
        }
    `