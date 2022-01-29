import Link from "next/link"

export default () => {
    return (
        <div>
            Navigation | <Link href="/">Main Page</Link> | <Link href="/posts">Posts</Link> | <Link href="/jobs">Jobs</Link>
        </div>
    )
}