import { Link } from "react-router-dom"

const Navbar = ({ userAuthorised, setUserAuthorised, setCurrUser }) => {

    const onSignOut = async (e) => {
        e.preventDefault()

        try {
            await fetch(`http://localhost:3000/sign-out`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userAuth')
            setUserAuthorised(false)
            setCurrUser(undefined)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <nav>
            <h1>k'nect</h1>

            {userAuthorised ?
                <div className="nav-actions">
                    <Link to={`/home`}>
                        Home
                    </Link>
                    <Link to={`/profile`}>
                        Profile
                    </Link>
                    <button onClick={onSignOut}>
                        Sign Out
                    </button>
                </div>
                :
                <div className="nav-actions">
                    <Link to={`/`}>
                        Login
                    </Link>
                    <Link to={`/sign-up`}>
                        Sign Up
                    </Link>
                </div>
            }
        </nav>
    )
}

export default Navbar