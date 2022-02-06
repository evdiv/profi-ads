import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from '../lib/mutations/signUp'
import { SIGNIN_MUTATION } from "../lib/mutations/signIn";
import { GET_AUTHENTICATED_USER } from "../lib/queries/getAuthenticatedUser";


export default function SignUp() {
    const initial = {
        email: '',
        name: '',
        password: '',
    }
    const [inputs, setInputs] = useState(initial);

    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
    });

    const [signin] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
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
        const signUpResult = await signup().catch(console.error);

        if (signUpResult?.data?.createUser?.id){
            await signin()
        }

        setInputs(initial)
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <h2>Register Account</h2>
            {error && <h3>Error</h3>}
            {loading && <h3>Loading...</h3>}

            <label htmlFor="email">Your Name</label>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                autoComplete="name"
                value={inputs.name}
                onChange={handleChange}
            />
                
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="password"
                value={inputs.password}
                onChange={handleChange}
            />
            <button type="submit">Create an Account</button>
        </form>
    );
}