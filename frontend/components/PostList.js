import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS } from '../lib/queries/getAllPosts';
import Link from 'next/link';

export default function PostList() {
    const { loading, error, data } = useQuery(GET_ALL_POSTS)

    if (error) return <div>Error loading posts.</div>
    if (loading) return <div>Loading</div>

    return (
        <section>
            <ul>
                {data.posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}