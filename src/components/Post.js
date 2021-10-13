import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Comment from './Comment';

const Post = () => {
    const [postsInfo, setPostsInfo] = useState([])
    const { id } = useParams()

    useEffect(() => {
        let isMounted = true;
        getAllPosts()
        return () => { isMounted = false }

        async function getAllPosts() {
            try {
                const res = await fetch(`http://localhost:3000/${id}/posts`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                })
                const data = await res.json()

                const formattedData = data.allPosts.map((post) => {
                    const comments = data.postsComments.filter((comment) => comment.postId === post._id)

                    const formattedDate = new Date(post.date).toLocaleDateString("en-gb", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })
                    const formattedTime = new Date(post.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                    })

                    return {
                        ...post,
                        comments: [...comments],
                        date: formattedDate,
                        time: formattedTime
                    }
                })

                if (res.status === 200 && isMounted) {
                    setPostsInfo(formattedData)
                }
            } catch (err) {
                throw err
            }
        }
    }, [id])

    // console.log(postsInfo)
    return (
        <div>
            {postsInfo.length > 0 ? postsInfo.map((data) => {
                return (
                    <div key={data._id} style={{ border: '2px solid black' }}>
                        <Link to={`/profile/${data.userId}`}>{data.username}</Link>
                        <p>{data.text}</p>
                        <p>Likes: {data.likes.length}</p>
                        <p>{data.date} @ {data.time}</p>
                        <Comment comments={data.comments} />
                    </div>
                )
            })
                :
                <div>Loading</div>
            }
        </div>

    )
}

export default Post