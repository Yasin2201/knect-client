const Post = ({ postData }) => {
    return (
        <div>
            <p>{postData.postUsername}</p>
            <p>{postData.text}</p>
            <p>Likes: {postData.likes.length}</p>
            <p>{postData.date} @ {postData.time}</p>
        </div>
    )
}

export default Post