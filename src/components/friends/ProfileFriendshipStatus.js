import { useEffect, useState } from "react/cjs/react.development"
import { useParams } from "react-router";

const ProfileFriendshipStatus = ({ currUser }) => {
    const [profileFriendStatus, setProfileFriendStatus] = useState({ reqStatus: false, friendshipStatus: false })
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

    const addFriend = async () => {
        try {
            const response = await fetch(`http://localhost:3000/${currUser}/request/${id}`, {
                method: 'POST',
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

    const removeFriend = async () => {
        try {
            const response = await fetch(`http://localhost:3000/${currUser}/unfriend/${id}`, {
                method: 'DELETE',
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

    return (
        profileFriendStatus.reqStatus && !profileFriendStatus.friendshipStatus ?
            <button disabled>{profileFriendStatus.msg}</button>
            :
            profileFriendStatus.reqStatus && profileFriendStatus.friendshipStatus ?
                <button onClick={removeFriend}>{profileFriendStatus.msg}</button>
                :
                <button onClick={addFriend}>{profileFriendStatus.msg}</button>
    )
}

export default ProfileFriendshipStatus;