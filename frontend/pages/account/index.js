import Link from "next/link"
import { useUser } from "../../components/useUser";

export default function MyAccountPage() {
    const user = useUser();

    return (
        <div>
            <h3>Account Page</h3>
            {!user ? 
                <ul>
                    <li><Link href="/account/register">Register Account</Link></li>
                    <li><Link href="/account/signIn">Sign In</Link></li>
                </ul>
                : 
                <ul>
                    <li><Link href="/account/jobs/">My Jobs</Link></li>
                    <li><Link href="/jobs/create">Create Job</Link></li>
                    <li><Link href="/account/signOut">Sign Out</Link> </li>
                </ul>
            }
        </div>
    )
}