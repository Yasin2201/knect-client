import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Comment from './Comment';
import NewComment from './NewComment';

const Post = ({ data, postsInfo, setPostsInfo }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [editedPost, setEditedPost] = useState(data)
    const currUser = sessionStorage.getItem('currUser')

    useEffect(() => {
        let isMounted = true;
        getAllPostsComments()
        return () => { isMounted = false }

        async function getAllPostsComments() {
            try {
                const res = await fetch(`http://localhost:3000/${data._id}/comments`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                })
                const resData = await res.json()

                const formattedData = resData.comments.map((comment) => {
                    const formattedDate = new Date(comment.date).toLocaleDateString("en-gb", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })
                    const formattedTime = new Date(comment.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                    })

                    return {
                        ...comment,
                        date: formattedDate,
                        time: formattedTime
                    }
                })

                if (res.status === 200 && isMounted) {
                    setComments(formattedData)
                }
            } catch (err) {
                throw err
            }
        }
    }, [data._id])

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

    const toggleLike = async () => {
        try {
            const res = await fetch(`http://localhost:3000/${currUser}/like-post/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
            const responseData = await res.json()

            const updatedPosts = postsInfo.map((post) => {
                return post._id === data._id ? { ...post, likes: responseData.newPost.likes } : { ...post }
            })

            if (res.status === 201) {
                setPostsInfo(updatedPosts)
            }
        } catch (err) {
            throw err
        }
    }

    const toggleComments = () => {
        setShowComments(!showComments)
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
                {data.likes.includes(currUser) ? <button onClick={toggleLike}>Unlike</button> : <button onClick={toggleLike}>Like</button>}
                {currUser === data.userId && <button onClick={editPost}>Edit</button>}
                {currUser === data.userId && <button onClick={deletePost}>Delete</button>}
                {showComments ?
                    <div>
                        <button onClick={toggleComments}>Hide Comments</button>
                        <NewComment currUser={currUser} postId={data._id} comments={comments} setComments={setComments} />
                        {comments.map((comment) => {
                            return <Comment data={comment} key={comment._id} comments={comments} setComments={setComments} />
                        })}
                    </div>
                    :
                    <div>
                        <button onClick={toggleComments}>Show Comments</button>
                    </div>}
            </div>
    )
}

export default Post