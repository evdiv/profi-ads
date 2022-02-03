import { useQuery, NetworkStatus } from '@apollo/client'
import { GET_ALL_POSTS, initialVars } from '../lib/queries/getAllPosts';
import Link from 'next/link';

export default function PostList({ page }) {
    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        GET_ALL_POSTS,
        {
            variables: initialVars,
            notifyOnNetworkStatusChange: true,
        })

    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore
    let { posts, postsCount } = data
    let areMorePosts = posts.length < postsCount 

    if (page === 'mainPage') {
        posts = posts.slice(0, process.env.postsPerPage)
        areMorePosts = false;
    }

    const loadMorePosts = () => {
        fetchMore({
            variables: {
                skip: posts.length,
            },
        })
    }  

    if (error) return <div>Error loading posts.</div>
    if (loading && !loadingMorePosts) return <div>Loading</div>

    return (
        <section>
            <ul>
                {data.posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
            {areMorePosts && (
                <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
                    {loadingMorePosts ? 'Loading...' : 'Show More'}
                </button>
            )}

        </section>
    )
}