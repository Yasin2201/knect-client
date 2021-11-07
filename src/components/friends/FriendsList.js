import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FriendsList = ({ currUser }) => {
    const [friends, setFriends] = useState([])

    useEffect(() => {
        try {
            async function getFriends() {
                const res = await fetch(`http://localhost:3000/${currUser}/friends`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                })
                const data = await res.json()
                if (data.friends) {
                    setFriends(data.friends)
                }
            }
            getFriends()

        } catch (error) {
            console.log(error)
        }
    }, [currUser])

    return (
        <div>
            {friends.map((friend) => {
                return (
                    <div key={friend._id}>
                        <Link to={`/profile/${friend._id}`}>{friend.username}</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default FriendsList;