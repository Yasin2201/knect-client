import { Link } from "react-router-dom";
import { useState } from 'react';
import Comment from './Comment';

const Post = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [textData, setTextData] = useState('')

    const editPost = () => {
        setIsEditing(!isEditing)
    }

    const editTextData = (e) => {
        setTextData(e.target.value)
    }

    return (
        isEditing
            ?
            <div style={{ border: '2px solid black' }}>
                <p>{data.username}</p>
                <textarea type="text" name="text" onChange={editTextData} defaultValue={data.text} />
                <p>Likes: {data.likes.length}</p>
                <p>{data.date} @ {data.time}</p>
                <button onClick={editPost}>Cancel</button>
            </div>
            :
            <div key={data._id} style={{ border: '2px solid black' }}>
                <Link to={`/profile/${data.userId}`}>{data.username}</Link>
                <p>{data.text}</p>
                <p>Likes: {data.likes.length}</p>
                <p>{data.date} @ {data.time}</p>
                <button onClick={editPost}>Edit</button>
                <Comment comments={data.comments} />
            </div>
    )
}

export default Post