import { useRouter } from 'next/router';
import { useUser } from "../../components/useUser";
import SignUp from "../../components/SignUp"

export default function RegisterAccountPage() {
    const user = useUser()
    const router = useRouter()

    if (user?.id) router.push('/account/')

    return (
        <div>
            <SignUp />
        </div>
    )
}