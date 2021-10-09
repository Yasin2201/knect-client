import { useState } from "react";

const Login = ({ setUserAuthorised }) => {


    return (
        <div className="login-div">
            <h2>Login</h2>
            <form className="login-form" onSubmit={onLogin}>
                <label htmlFor="username">Username:</label>
                <input id="username" name="username" type="text" />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" />
                <button type="submit">Sign In</button>
            </form>
            {message &&
                <p className="error-message">
                    {message}!
                </p>
            }
        </div>
    )
}

export default Login;