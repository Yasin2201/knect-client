const Signup = () => {
    return (
        <div className="signup-div">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={onLogin}>
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

export default Signup;