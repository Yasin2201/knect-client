import { useEffect, useState } from "react";
import Post from "./Post";

const Home = ({ currUser }) => {
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
                    setPostsInfo(data)
                } catch (err) {
                    throw err
                }
            }
            getAllPosts()
        }
    }, [currUser])

    return (
        <div>
            {postsInfo.posts && postsInfo.posts.map((post) => {
                return <Post postData={post} />
            })}
        </div>

    )
};

export default Home;