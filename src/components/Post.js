const Post = ({ postData }) => {
    return (
        <div key={postData._id}>
            <h3>{postData.text}</h3>
        </div>
    )
}

export default Post