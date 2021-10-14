import { useState } from "react";

const NewComment = ({ currUser, postId, setComments, comments }) => {
    const [errors, setErrors] = useState();

    const submitNewComment = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const userInput = {
            text: formData.get('text'),
        }

        try {
            const response = await fetch(`http://localhost:3000/${currUser}/post/${postId}/new-comment`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(userInput)
            })
            const data = await response.json()

            if (data.errors) {
                setErrors(data.alerts)
            } else {
                setErrors()
                e.target.reset()

                const formattedDate = new Date(data.comment.date).toLocaleDateString("en-gb", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })
                const formattedTime = new Date(data.comment.date).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                })

                const formattedNewComment = {
                    ...data.comment,
                    date: formattedDate,
                    time: formattedTime
                }

                setComments([formattedNewComment, ...comments])
            }
        } catch (err) {
            throw err
        }
    }

    return (
        <div>
            <form className="new-comment-form" onSubmit={(e) => submitNewComment(e)}>
                <textarea type="text" name="text" placeholder="Leave a comment..." />
                <button className="submit-btn" type="submit">Submit</button>
            </form>

            {errors && errors.map((error) => {
                return (
                    <div key={errors.indexOf(error)} className="error-message">
                        {error.msg}!
                    </div>
                )
            })}
        </div>
    )
};

export default NewComment;