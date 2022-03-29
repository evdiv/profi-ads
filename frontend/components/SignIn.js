import { useMutation } from "@apollo/client";
import { SIGNIN_MUTATION } from "../lib/mutations/signIn";
import { GET_AUTHENTICATED_USER } from "../lib/queries/getAuthenticatedUser";
import { useState } from "react";

export default function SignIn() {
    const initial = {
        email: '',
        password: '',
    }
    const [inputs, setInputs] = useState(initial);

    const [signin, { data }] = useMutation(SIGNIN_MUTATION, {
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
        await signin();
        setInputs(initial)
    }

    const error =
        data?.authenticateUserWithPassword.__typename ===
            'UserAuthenticationWithPasswordFailure'
            ? data?.authenticateUserWithPassword
            : undefined;

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Into Your Account</h2>
            {error && <h3>Error...</h3>}

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

            <button type="submit">Sign In!</button>
        </form>
    );
}