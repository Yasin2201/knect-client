import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Comment = ({ comments }) => {
    const [formattedComments, setFormattedComments] = useState([])

    useEffect(() => {
        const formattedData = comments.map((comment) => {
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
        setFormattedComments(formattedData)
    }, [comments])

    // console.log(formattedComments)
    return (
        <div>
            {
                formattedComments.length > 0 &&
                formattedComments.map((comment) => {
                    return (
                        <div key={comment._id} style={{ border: '1px solid red' }}>
                            <Link to={`/profile/${comment.userId}`}>{comment.commentUsername}</Link>
                            <p>{comment.text}</p>
                            <p>Likes: {comment.likes.length}</p>
                            <p>{comment.date} @ {comment.time}</p>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default Comment;