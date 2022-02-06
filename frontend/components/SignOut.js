import { useMutation } from "@apollo/client";
import { SIGNOUT_MUTATION } from "../lib/mutations/signOut";
import { GET_AUTHENTICATED_USER } from "../lib/queries/getAuthenticatedUser";

export default function SignOut() {
    const [signOut] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
    })

    return (
        <button type="button" onClick={signOut}>
            Sign Out
        </button>
    )
}