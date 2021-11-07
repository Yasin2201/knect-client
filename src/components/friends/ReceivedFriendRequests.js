import { useEffect } from "react"

const ReceivedFriendRequests = ({ currUser }) => {


    useEffect(() => {
        try {
            async function getReceivedReqs() {
                const res = await fetch(`http://localhost:3000/${currUser}/recieved-requests`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                })
                const data = await res.json()
                console.log(data.all_requests)

            }
            getReceivedReqs()

        } catch (error) {
            console.log(error)
        }
    }, [currUser])

    return (
        <div>
            Received Friend Requests
        </div>
    )
}

export default ReceivedFriendRequests;