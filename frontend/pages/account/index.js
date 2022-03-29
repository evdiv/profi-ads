import Link from "next/link"
import { useUser } from "../../components/useUser";
import SignOut from "../../components/SignOut";

export default function MyAccountPage() {
    const user = useUser();

    return (
        <div>
            <h3>Account Page</h3>
            {user?.occupation && <h4>{user?.occupation.title}</h4>}

            {!user ? 
                <ul>
                    <li><Link href="/account/register">Register Account</Link></li>
                    <li><Link href="/account/signIn">Sign In</Link></li>
                </ul>
                : 
                <div>
                    <h4>{user.name} - {user.email}</h4>
                    <ul>
                        <li><Link href="/account/jobs/">My Jobs</Link></li>
                        <li><Link href="/jobs/create">Create Job</Link></li>
                        <li><SignOut /></li>
                    </ul>
                </div>
            }
        </div>
    )
}