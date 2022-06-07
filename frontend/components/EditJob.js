import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from "@apollo/client"
import { useDepartments } from "./useDepartments"
import { GET_JOB_BY_ID } from "../lib/queries/getJobById"
import { EDIT_JOB_MUTATION } from '../lib/mutations/editJob'


export default function EditJob({ id }) { 
    const initial = {
        title: '',
        description: '',
    }

    const router = useRouter()
    const allDepartments = useDepartments()
    const [inputs, setInputs] = useState(initial);
    const [departments, setDepartments] = useState([])
    
    const job = useQuery(GET_JOB_BY_ID, {
            variables: { id }
        }
    )

    const [edit, editJob] = useMutation(EDIT_JOB_MUTATION, {
        variables: {
            id,
            title: inputs.title,
            description: inputs.description,
            departments: { connect: departments.map(dep => ({id: dep.id}))}
        },
    });

    useEffect(() => {
        setInputs({
            title: job.data.title,
            description: job.data.description,
        })
        setDepartments(data.job.departments)
    },[])

    function handleChangeDepartments(e) {
        let { value } = e.target;
        let [department] = allDepartments.filter(dep => (dep.id === value))

        setDepartments([...new Set([...departments, department])])
    }

    function handleChange(e) {
        let { value, name } = e.target

        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    function removeDepartment(id) {
        setDepartments(departments.filter(dep => (dep.id !== id)))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await edit()
    }

    if (editJob.error) return <div>Error updating the jobs.</div>
    if (editJob.loading) return <div>Loading</div>

    if (editJob?.id) router.push('/account/jobs')

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <h2>Create Job</h2>
            <div>
                <h4>Selected Departments</h4>
                {departments &&
                    <ul>
                        {departments.map(dep => (
                            <li key={dep.id} style={{cursor: 'pointer'}}
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
            <button type="submit">Edit Job</button>
        </form>
    );
}