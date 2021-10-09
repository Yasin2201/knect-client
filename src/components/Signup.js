import { useState } from "react";

const Signup = () => {
    const [message, setMessage] = useState()

    const onSignUp = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const userInput = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        try {
            const response = await fetch(`http://localhost:3000/sign-up`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInput)
            })
            const data = await response.json()
            setMessage(data.alerts[0].msg)
        } catch (err) {
            console.error(err)
        }
        e.target.reset()
    }

    return (
        <div className="signup-div">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={onSignUp}>
                <label htmlFor="username">Username:</label>
                <input id="username" name="username" type="text" />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" />
                <button type="submit">Sign Up</button>
            </form>
            {message &&
                <p className="error-message">
                    {message}!
                </p>
            }
        </div>
    )
}

export default Signup;