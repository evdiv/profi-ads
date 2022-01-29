import { useQuery, gql } from '@apollo/client';
import Link from "next/link";

const ALL_POSTS = gql`
        query ALL_POSTS_QUERY {
            posts {
                id,
                title
            }
        }
    `

const Posts = () => {
    const {data, error, loading } = useQuery(ALL_POSTS) //Client Side query

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data.posts.map((post) => (
                <p key={post.id}>
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </p>
            ))}
        </div>
    )
}

export default Posts