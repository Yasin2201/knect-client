const NewPost = ({ postsInfo, setPostsInfo }) => {

    const submitNewPost = async (e) => {

    }

    return (
        <form className="new-comment-form" onSubmit={(e) => submitNewPost(e)}>
            <textarea type="text" name="text" placeholder="Share your thoughts..." />
            <button className="submit-btn" type="submit">Submit</button>
        </form>
    )
};

export default NewPost;