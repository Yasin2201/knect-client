import { useState } from "react";

const NewPost = ({ currUser }) => {
    const [errors, setErrors] = useState();

    const submitNewPost = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const userInput = {
            text: formData.get('text'),
        }

        try {
            const response = await fetch(`http://localhost:3000/${currUser}/new-post`, {
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
                window.location.reload(false);
            }
        } catch (err) {
            throw err
        }
    }

    return (
        <div>
            <form className="new-post-form" onSubmit={(e) => submitNewPost(e)}>
                <textarea type="text" name="text" placeholder="Share your thoughts..." />
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

export default NewPost;