import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
        query ALL_POSTS_QUERY($skip: Int = 0, $take: Int) {
            posts(take: $take, skip: $skip) {
                id,
                title
            }
            postsCount
        }`

export const initialVars = {
    skip: 0,
    take: process.env.postsPerPage,
}            