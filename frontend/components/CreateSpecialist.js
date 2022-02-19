import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { useDepartments } from "./useDepartments"
import { CREATE_SPECIALIST_MUTATION } from '../lib/mutations/createSpecialist'
import { GET_AUTHENTICATED_USER } from "../lib/queries/getAuthenticatedUser";

export default function CreateSpecialist() {
    const initial = {
        title: '',
        about: '',
    }

    const allDepartments = useDepartments()

    const [inputs, setInputs] = useState(initial);
    const [departments, setDepartments] = useState([])

    const [create, { data, loading, error }] = useMutation(CREATE_SPECIALIST_MUTATION, {
        variables: {
            title: inputs.title,
            about: inputs.about,
            departments: { connect: departments.map(dep => ({ id: dep.id })) }
        },
        refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
    });

    function handleChangeDepartments(e) {
        let { value } = e.target;
        let [department] = allDepartments.filter(dep => (dep.id === value))

        setDepartments([...new Set([...departments, department])]);
    }

    function handleChange(e) {
        let { value, name } = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    function removeDepartment(id) {
        setDepartments(departments.filter(dep => (dep.id !== id)));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await create().catch(console.error);

        setInputs(initial)
        setDepartments([])
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <h2>To respond please register as a Specialist</h2>
            {error && <h3>Error</h3>}
            {loading && <h3>Loading...</h3>}

            <div>
                <h4>Selected Departments</h4>
                {departments &&
                    <ul>
                        {departments.map(dep => (
                            <li key={dep.id} style={{ cursor: 'pointer' }}
                                onClick={() => { removeDepartment(dep.id) }}>{dep.name}</li>
                        ))}
                    </ul>
                }
            </div>

            <div>
                <label htmlFor="title">Select Departments</label>
                {allDepartments &&
                    <select name="departments" onChange={handleChangeDepartments}>
                        {allDepartments.map(dep => (
                            <option key={dep.id} value={dep.id}>{dep.name}</option>
                        ))}
                    </select>
                }
            </div>

            <div>
                <label htmlFor="title">Specialist Title</label>
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
                <label htmlFor="description">About</label>
                <textarea
                    name="about"
                    onChange={handleChange}
                    value={inputs.description}
                />
            </div>
            <button type="submit">Add your occupation</button>
        </form>
    );
}