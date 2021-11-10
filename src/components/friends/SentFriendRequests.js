import { useEffect, useState } from "react"

const SentFriendRequests = ({ currUser }) => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        try {
            async function getSentReqs() {
                const res = await fetch(`http://localhost:3000/${currUser}/sent-requests`, {
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
            getSentReqs()

        } catch (error) {
            console.log(error)
        }
    }, [currUser])

    return (
        <div>
            Sent Friend Requests
        </div>
    )
}

export default SentFriendRequests;