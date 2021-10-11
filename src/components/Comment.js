import { useEffect, useState } from "react";

const Comment = ({ postID }) => {
    const [commentsInfo, setCommentsInfo] = useState([])

    useEffect(() => {
        try {
            const getComments = async () => {
                const res = await fetch(`http://localhost:3000/${postID}/comments`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                });

                const data = await res.json()

                const formattedData = data.comments.map((comment) => {
                    const commentUsername = data.allUsers.find(user => comment.userId === user._id).username
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
                        commentUsername,
                        ...comment,
                        date: formattedDate,
                        time: formattedTime
                    }
                })
                setCommentsInfo(formattedData)
            }
            getComments()
        } catch (error) {
            throw error
        }

    }, [postID])

    return (
        <div></div>
    )
}

export default Comment;