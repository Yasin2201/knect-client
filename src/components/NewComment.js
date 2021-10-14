import { useState } from "react";

const NewComment = ({ currUser, postId, setComments, comments }) => {
    const [errors, setErrors] = useState();



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