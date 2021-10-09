
const Navbar = ({ userAuthorised, setUserAuthorised }) => {
    return (
        <nav>
            <h1>k'nect</h1>

            {userAuthorised &&
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
                </div>}
        </nav>
    )
}

export default Navbar