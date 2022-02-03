import Link from "next/link"

export default function TopNav() {
    return (
        <div>
            [ <Link href="/">Main Page</Link> ] 
            [ <Link href="/posts">Posts</Link> ] 
            [ <Link href="/jobs">Jobs</Link> ]
            [ <Link href="/account">Account</Link> ]
        </div>
    )
}