import Link from "next/link"

export default function MyAccountPage() {
    return (
        <div>
            <h3>Account Page</h3>
            <ul>
                <li><Link href="/account/register">Register Account</Link></li>
                <li><Link href="/account/signIn">Sign In</Link></li>
                <li><Link href="/account/signOut">Sign Out</Link> </li>
            </ul>
        </div>
    )
}