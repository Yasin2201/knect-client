import RequestCard from "./RequestCard"
import { useEffect, useState } from "react"

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

    return (
        <div>
            {
                requests.map((request) => {
                    return (
                        <RequestCard key={request._id} data={request} requests={requests} setRequests={setRequests} />
                    )
                })
            }
        </div>
    )
}

export default ReceivedFriendRequests;