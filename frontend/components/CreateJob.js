import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { useDepartments } from "../components/useDepartments"
import { CREATE_JOB_MUTATION } from '../lib/mutations/createJob'


export default function CreateJob() {
    const initial = {
        title: '',
        description: '',
        departments: {connect: []},
    }
    const [inputs, setInputs] = useState(initial);
    const departments = useDepartments()

    const [create, { data, loading, error }] = useMutation(CREATE_JOB_MUTATION, {
        variables: inputs,
    });

    function handleChange(e) {
        let { value, name } = e.target;
        if (name === 'departments'){
            setInputs({
                ...inputs,
                departments: { connect: [{ id: value }]}
            });
            return
        }

        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await create().catch(console.error);

        setInputs(initial)
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <h2>Create Job</h2>
            {error && <h3>Error</h3>}
            {loading && <h3>Loading...</h3>}

            <div>
                <label htmlFor="title">Choose Department</label>
                {departments && 
                    <select name="departments" onChange={handleChange}>
                        <option disabled selected value>Select ...</option>
                        {departments.map(dep => (
                            <option key={dep.id} value={dep.id}>{dep.name}</option>
                        ))}
                    </select>
                }
            </div>

            <div>
                <label htmlFor="title">Job Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Job Title"
                    autoComplete="title"
                    value={inputs.title}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="description">Job Description</label>
                <textarea 
                    name="description" 
                    onChange={handleChange}
                    value={inputs.description}
                />
            </div>
            <button type="submit">Create a new Job</button>
        </form>
    );
}