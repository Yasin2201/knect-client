import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ReceivedFriendRequests = ({ currUser }) => {
    const [requests, setRequests] = useState([])

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

                if (data.all_requests) {
                    setRequests(data.all_requests)
                }
            }
            getReceivedReqs()

        } catch (error) {
            console.log(error)
        }
    }, [currUser])
    console.log(requests)

    return (
        <div>
            {
                requests.map((request) => {
                    return (
                        <div key={request._id}>
                            <Link to={`/profile/${request.requester._id}`}>{request.requester.username}</Link>
                            <button>Accept</button>
                            <button>Decline</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReceivedFriendRequests;