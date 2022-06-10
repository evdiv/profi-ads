import Link from "next/link"

export default function SignInOrRegister () {
    return (
        <div>
            <Link href="/account/signIn">Sign In</Link> 
            or 
            <Link href="/account/register">Register</Link>
        </div>
    )
}