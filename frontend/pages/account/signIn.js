import { useRouter } from 'next/router';
import { useUser } from "../../components/useUser";
import SignIn from "../../components/SignIn"

export default function SignInPage() {
    const user = useUser()
    const router = useRouter()

    if (user?.id) router.push('/account/')

    return (
        <div>
            <SignIn />
        </div>
    )
}