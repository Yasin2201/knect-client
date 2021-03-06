import { Link } from "react-router-dom"
import { useHistory } from "react-router"

const Navbar = ({ userAuthorised, setUserAuthorised, currUser, setCurrUser }) => {
    let history = useHistory()

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
            sessionStorage.removeItem('currUser')
            setUserAuthorised(false)
            setCurrUser(undefined)
            history.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <nav>
            <h1>k'nect</h1>

            {userAuthorised ?
                <div className="nav-actions">
                    <Link to={`/`}>
                        Home
                    </Link>
                    <Link to={`/profile/${currUser}`}>
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