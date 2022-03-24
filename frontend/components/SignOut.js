import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router';
import { SIGNOUT_MUTATION } from "../lib/mutations/signOut";
import { GET_AUTHENTICATED_USER } from "../lib/queries/getAuthenticatedUser";

export default function SignOut() {
    const router = useRouter()
    const [signOut] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{ query: GET_AUTHENTICATED_USER }]
    })

    const signOutUser = () => {
        signOut()
        router.push('/account')
    }

    return (
        <button type="button" onClick={signOutUser}>
            Sign Out
        </button>
    )
}