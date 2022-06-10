import { useMutation } from "@apollo/client";
import { ACCEPT_OFFER_MUTATION } from '../lib/mutations/acceptOffer'


export default function AcceptOffer({jobId, userId, refetch}) {

    const [update, {error, data}] = useMutation(ACCEPT_OFFER_MUTATION, {
        variables: {
            jobId,
            userId
        },
    });

    async function handleSubmit(e) {
        e.preventDefault();
        await update().catch(console.error)

        refetch()
    }

    if (error) return <div>Error updating the job</div>

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <button type="submit">Accept Offer</button>
        </form>
    );
}