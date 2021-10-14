import { useState } from "react";
import { Link } from "react-router-dom";

const Comment = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false)
    const currUser = sessionStorage.getItem('currUser')

    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    return (
        isEditing ?
            <div key={data._id} style={{ border: '1px solid red' }}>
                <p>{data.username}</p>
                <textarea type="text" name="text" defaultValue={data.text} />
                <p>Likes: {data.likes.length}</p>
                <p>{data.date} @ {data.time}</p>
                {currUser === data.userId && <button onClick={toggleEdit}>Cancel</button>}
            </div>
            :
            <div key={data._id} style={{ border: '1px solid red' }}>
                <Link to={`/profile/${data.userId}`}>{data.username}</Link>
                <p>{data.text}</p>
                <p>Likes: {data.likes.length}</p>
                <p>{data.date} @ {data.time}</p>
                {currUser === data.userId && <button onClick={toggleEdit}>Edit</button>}
            </div>
    )
}

export default Comment;