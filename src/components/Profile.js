import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Post from './Post';
import NewPost from "./NewPost";
import FriendsDisplay from "./friends/FriendsDisplay";

//TO-DO----
//Get friends list and render
//Get liked posts

const Profile = ({ currUser }) => {
    const [userDetails, setUserDetails] = useState()
    const [postsInfo, setPostsInfo] = useState([])
    const { id } = useParams();

    useEffect(() => {
        let isMounted = true;
        getUsersDetails()
        return () => { isMounted = false }

        async function getUsersDetails() {
            try {
                const response = await fetch(`http://localhost:3000/profile/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                })
                const data = await response.json()

                if (response.status === 200 && isMounted) {
                    setUserDetails(data.user)
                }
            } catch (err) {
                throw err
            }
        }
    }, [id])

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

                if (res.status === 200 && isMounted) {
                    setPostsInfo(formattedData)
                }
            } catch (err) {
                throw err
            }
        }
    }, [id])


    return (
        <div>
            {
                userDetails ?
                    <div>
                        <h1>{userDetails.username}</h1>
                        {currUser === id && <FriendsDisplay />}
                        {currUser === id && <NewPost currUser={currUser} postsInfo={postsInfo} setPostsInfo={setPostsInfo} />}

                        <h3>My Posts</h3>
                        {postsInfo.map((data) => {
                            return <Post data={data} key={data._id} postsInfo={postsInfo} setPostsInfo={setPostsInfo} />
                        })}
                    </div>
                    :
                    <div>Loading...</div>
            }
        </div>
    )
}

export default Profile;