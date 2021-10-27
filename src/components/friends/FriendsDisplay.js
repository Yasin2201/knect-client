import FriendsList from "./FriendsList";
import ReceivedFriendRequests from "./ReceivedFriendRequests";
import SentFriendRequests from "./SentFriendRequests";

const FriendsDisplay = () => {
    return (
        <div>
            <FriendsList />
            <ReceivedFriendRequests />
            <SentFriendRequests />
        </div>
    )
}

export default FriendsDisplay