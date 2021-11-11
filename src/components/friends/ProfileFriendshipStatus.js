import { useEffect, useState } from "react/cjs/react.development"
import { useParams } from "react-router";

const ProfileFriendshipStatus = ({ currUser }) => {
    const [profileFriendStatus, setProfileFriendStatus] = useState({ status: false })
    const { id } = useParams();

    useEffect(() => {
        async function checkIfFriends() {
            try {
                const response = await fetch(`http://localhost:3000/${currUser}/friends/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                })
                const data = await response.json()
                setProfileFriendStatus(data)
            } catch (err) {
                throw err
            }
        }
        if (currUser !== id) {
            checkIfFriends()
        }
    }, [id, currUser])

    console.log(profileFriendStatus)
    return (
        <div>
            {
                profileFriendStatus.status ?
                    <button>{profileFriendStatus.msg}</button>
                    :
                    <button disabled>{profileFriendStatus.msg}</button>
            }
        </div>
    )
}

export default ProfileFriendshipStatus;