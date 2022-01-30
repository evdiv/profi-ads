import Link from "next/link"

export default function TopNav() {
    return (
        <div>
            Navigation | <Link href="/">Main Page</Link> | <Link href="/posts">Posts</Link> | <Link href="/jobs">Jobs</Link>
        </div>
    )
}