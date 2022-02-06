import Link from "next/link"
import SignOut from "./SignOut";
import { useUser } from "./useUser";

export default function TopNav() {
    const user = useUser();

    return (
        <div>
            [ <Link href="/">Main Page</Link> ] 
            [ <Link href="/posts">Posts</Link> ] 
            [ <Link href="/jobs">Jobs</Link> ]
            [ <Link href="/account/register">Register Account</Link> ]
            [ <Link href="/account/signIn">Sign In</Link> ]
            {user 
                && 
                <>
                    [ <Link href="/jobs/create">Create Job</Link> ]
                    [ <Link href="/account">My Account</Link> ]
                    <SignOut />
                </>
}
        </div>
    )
}