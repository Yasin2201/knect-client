import { useEffect, useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";

const Timeline = ({ currUser }) => {
    const [postsInfo, setPostsInfo] = useState([])

    useEffect(() => {
        if (currUser) {
            let isMounted = true;
            getAllPosts()
            return () => { isMounted = false }

            async function getAllPosts() {
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
        }
    }, [currUser])

    return (
        <div>
            <NewPost currUser={currUser} postsInfo={postsInfo} setPostsInfo={setPostsInfo} />
            {postsInfo.length > 0 ?
                postsInfo.map((data) => {
                    return <Post data={data} key={data._id} />
                })
                :
                <div>Loading...</div>
            }
        </div>

    )
}

export default Timeline