import { useState } from "react";
import { Link } from "react-router-dom";

const Comment = ({ data, comments, setComments }) => {
    const currUser = sessionStorage.getItem('currUser')
    const [isEditing, setIsEditing] = useState(false)
    const [editedComment, setEditedComment] = useState(data)

    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const editTextData = (e) => {
        setEditedComment({ ...editedComment, text: e.target.value })
    }

    const editCommentSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:3000/${currUser}/update-comment/${data._id}`, {
                method: 'PUT',
                body: JSON.stringify(editedComment),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
            const responseData = await res.json()

            const updatedComments = comments.map((comment) => {
                return comment._id === editedComment._id ? { ...comment, text: editedComment.text } : comment
            })

            if (res.status === 200) {
                setComments(updatedComments)
                setIsEditing(!isEditing)
                console.log(responseData.alerts)
            }
        } catch (err) {
            throw err
        }
    }

    return (
        isEditing ?
            <div key={data._id} style={{ border: '1px solid red' }}>
                <p>{data.username}</p>
                <textarea type="text" name="text" onChange={editTextData} defaultValue={editedComment.text} />
                <p>Likes: {data.likes.length}</p>
                <p>{data.date} @ {data.time}</p>
                <button onClick={editCommentSubmit}>Submit</button>
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