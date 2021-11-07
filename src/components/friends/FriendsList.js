import { useEffect } from "react";

const FriendsList = ({ currUser }) => {
    console.log(currUser)

    useEffect(() => {
        try {
            async function getFriends() {
                const res = await fetch(`http://localhost:3000/${currUser}/friends`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                const data = await res.json()
                console.log(data)

            }
            getFriends()
        } catch (error) {
            console.log(error)
        }
    }, [currUser])

    return (
        <div>
            Friends List
        </div>
    )
}

export default FriendsList;