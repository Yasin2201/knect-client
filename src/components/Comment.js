import { Link } from "react-router-dom";

const Comment = ({ data }) => {

    return (
        <div>
            <div key={data._id} style={{ border: '1px solid red' }}>
                <Link to={`/profile/${data.userId}`}>{data.username}</Link>
                <p>{data.text}</p>
                <p>Likes: {data.likes.length}</p>
                <p>{data.date} @ {data.time}</p>
            </div>
        </div>

    )
}

export default Comment;