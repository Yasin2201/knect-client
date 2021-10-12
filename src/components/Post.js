import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Comment from './Comment';

const Post = () => {
    const [postsInfo, setPostsInfo] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const getAllPosts = async () => {
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
                        date: formattedDate,
                        time: formattedTime
                    }
                })

                setPostsInfo(formattedData)
            } catch (err) {
                throw err
            }
        }
        getAllPosts()
    }, [id])

    return (
        postsInfo.length > 0 && postsInfo.map((data) => {
            return (
                <div key={data._id} style={{ border: '2px solid black' }}>
                    <p>{data.postUsername}</p>
                    <p>{data.text}</p>
                    <p>Likes: {data.likes.length}</p>
                    <p>{data.date} @ {data.time}</p>
                    <Comment postID={data._id} />
                </div>
            )
        })
    )
}

export default Post