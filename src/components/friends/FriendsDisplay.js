import { useState } from "react";
import FriendsList from "./FriendsList";
import ReceivedFriendRequests from "./ReceivedFriendRequests";
import SentFriendRequests from "./SentFriendRequests";

const FriendsDisplay = ({ currUser }) => {
    let [viewOption, setViewOption] = useState('All Friends')
    let currentView;

    const ToggleDisplayedComponent = (e) => {
        const clickedComponent = e.target.textContent
        setViewOption(clickedComponent)
    }

    if (viewOption === 'All Friends') {
        currentView = <FriendsList currUser={currUser} />
    } else if (viewOption === 'Received Requests') {
        currentView = <ReceivedFriendRequests currUser={currUser} />
    } else if (viewOption === 'Sent Requests') {
        currentView = <SentFriendRequests currUser={currUser} />
    }

    return (
        <div>
            <button onClick={ToggleDisplayedComponent}>All Friends</button>
            <button onClick={ToggleDisplayedComponent}>Received Requests</button>
            <button onClick={ToggleDisplayedComponent}>Sent Requests</button>
            {currentView}
        </div>
    )
}

export default FriendsDisplay