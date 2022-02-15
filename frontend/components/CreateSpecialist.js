import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { useDepartments } from "./useDepartments"
import { CREATE_SPECIALIST_MUTATION } from '../lib/mutations/createSpecialist'


export default function CreateSpecialist() {
    const initial = {
        title: '',
        about: '',
        departments: {connect: []},
    }
    const [inputs, setInputs] = useState(initial);
    const [selectedDepartments, setDepartments] = useState([]);
    const departments = useDepartments()

    const [create, { data, loading, error }] = useMutation(CREATE_SPECIALIST_MUTATION, {
        variables: inputs,
    });

    function handleChange(e) {
        let { value, name } = e.target;

        if (name === 'departments'){
            let [selected] = departments.filter(dep => {
                return dep.id === value
            })
            setDepartments([...new Set([...selectedDepartments, selected])]);
            return
        }

        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    function removeSelectedDepartment(id) {
        setDepartments(selectedDepartments.filter(dep => (dep.id !== id)));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await create().catch(console.error);

        setInputs(initial)
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <h2>Create Specialist</h2>
            {error && <h3>Error</h3>}
            {loading && <h3>Loading...</h3>}

            <div>
                <h4>Selected Departments</h4>
                {selectedDepartments &&
                    <ul>
                        {selectedDepartments.map(dep => (
                            <li key={dep.id} style={{cursor: 'pointer'}}
                                onClick={() => { removeSelectedDepartment(dep.id) }}>{dep.name}</li>
                        ))}
                    </ul>
                }
            </div> 

            <div>
                <label htmlFor="title">Choose Department</label>
                {departments && 
                    <select name="departments" onChange={handleChange}>
                        {departments.map(dep => (
                            <option key={dep.id} value={dep.id}>{dep.name}</option>
                        ))}
                    </select>
                }
            </div>

            <div>
                <label htmlFor="title">Your occupation</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Occupation Title"
                    autoComplete="title"
                    value={inputs.title}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="about">Write about yourself</label>
                <textarea 
                    name="about" 
                    onChange={handleChange}
                    value={inputs.about}
                />
            </div>
            <button type="submit">Register as a Specialist</button>
        </form>
    );
}