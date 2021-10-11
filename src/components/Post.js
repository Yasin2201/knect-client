import Comment from './Comment'

const Post = ({ postData }) => {
    return (
        <div style={{ border: '2px solid black' }}>
            <p>{postData.postUsername}</p>
            <p>{postData.text}</p>
            <p>Likes: {postData.likes.length}</p>
            <p>{postData.date} @ {postData.time}</p>
            <Comment postID={postData._id} />
        </div>
    )
}

export default Post