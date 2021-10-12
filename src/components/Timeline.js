import { useEffect, useState } from "react";
import Comment from './Comment';

const Timeline = ({ currUser }) => {
    const [postsInfo, setPostsInfo] = useState([])

    useEffect(() => {
        if (currUser) {
            const getAllPosts = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/${currUser}/timeline`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        },
                    })
                    const data = await res.json()

                    const formattedData = data.posts.map((post) => {
                        const postUsername = data.allUsers.find(user => post.userId === user._id).username

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
                            postUsername,
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
        }
    }, [currUser])

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

export default Timeline