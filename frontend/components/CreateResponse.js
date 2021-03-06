import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { CREATE_RESPONSE_MUTATION } from '../lib/mutations/createResponse'


export default function CreateResponse({jobId, isOwner, refetch}) {
    const initial = {
        description: '',
    }

    const [inputs, setInputs] = useState(initial);

    const [create, { data, error }] = useMutation(CREATE_RESPONSE_MUTATION, {
        variables: {
            description: inputs.description,
            job: { connect: { id: jobId }}
        },
    });

    function handleChange(e) {
        let { value, name } = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await create().catch(console.error)
        
        setInputs(initial)
        refetch()
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            {error && <h3>Error</h3>}
            <div>
                <textarea 
                    rows="10"
                    cols="50"
                    name="description" 
                    onChange={handleChange}
                    value={inputs.description}
                />
            </div>
            <button type="submit">{isOwner ? 'Add Comment' : 'Respond to job'}</button>
        </form>
    );
}