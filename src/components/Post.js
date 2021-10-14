import { Link } from "react-router-dom";
import { useState } from 'react';
import Comment from './Comment';

const Post = ({ data, postsInfo, setPostsInfo }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedPost, setEditedPost] = useState(data)
    const currUser = sessionStorage.getItem('currUser')

    const editPost = () => {
        setIsEditing(!isEditing)
    }

    const editTextData = (e) => {
        setEditedPost({ ...editedPost, text: e.target.value })
    }

    const editPostSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:3000/${currUser}/update-post/${data._id}`, {
                method: 'PUT',
                body: JSON.stringify(editedPost),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
            const responseData = await res.json()

            const updatedPosts = postsInfo.map((post) => {
                return post._id === editedPost._id ? { ...post, text: editedPost.text } : post
            })

            if (res.status === 200) {
                setPostsInfo(updatedPosts)
                setIsEditing(!isEditing)
                console.log(responseData.alerts)
            }
        } catch (err) {
            throw err
        }
    }

    const deletePost = async () => {
        try {
            const res = await fetch(`http://localhost:3000/${currUser}/delete-post/${data._id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
            const responseData = await res.json()

            const updatedPosts = postsInfo.filter((post) => {
                return post._id !== editedPost._id
            })

            if (res.status === 200) {
                setPostsInfo(updatedPosts)
                console.log(responseData.alerts)
            }
        } catch (err) {
            throw err
        }
    }

    return (
        isEditing
            ?
            <div style={{ border: '2px solid black' }}>
                <p>{data.username}</p>
                <textarea type="text" name="text" onChange={editTextData} defaultValue={editedPost.text} />
                <p>Likes: {data.likes.length}</p>
                <p>{data.date} @ {data.time}</p>
                <button onClick={editPostSubmit}>Submit</button>
                <button onClick={editPost}>Cancel</button>
            </div>
            :
            <div key={data._id} style={{ border: '2px solid black' }}>
                <Link to={`/profile/${data.userId}`}>{data.username}</Link>
                <p>{data.text}</p>
                <p>Likes: {data.likes.length}</p>
                <p>{data.date} @ {data.time}</p>
                {currUser === data.userId && <button onClick={editPost}>Edit</button>}
                {currUser === data.userId && <button onClick={deletePost}>Delete</button>}
                <Comment comments={data.comments} />
            </div>
    )
}

export default Post