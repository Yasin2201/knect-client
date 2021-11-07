import { Link } from "react-router-dom";

const RequestCard = ({ data, requests, setRequests }) => {

    const filterFriendReqs = () => {
        const filteredReqs = requests.filter((req) => req._id !== data._id)
        setRequests(filteredReqs)
    }

    const acceptRequest = async () => {
        try {
            const res = await fetch(`http://localhost:3000/${data.recipient}/request/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
            const resData = await res.json()
            console.log(resData)
            filterFriendReqs()
        } catch (error) {
            console.log(error)
        }
    }

    const declineRequest = async () => {
        try {
            const res = await fetch(`http://localhost:3000/${data.recipient}/request/${data._id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
            const resData = await res.json()
            console.log(resData)
            filterFriendReqs()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <Link to={`/profile/${data.requester._id}`}>{data.requester.username}</Link>
                <button onClick={acceptRequest}>Accept</button>
                <button onClick={declineRequest}>Decline</button>
            </div>
        </div>
    )
}

export default RequestCard;