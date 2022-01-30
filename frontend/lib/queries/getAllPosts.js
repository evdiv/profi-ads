import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
        query ALL_POSTS_QUERY {
            posts {
                id,
                title
            }
        }`