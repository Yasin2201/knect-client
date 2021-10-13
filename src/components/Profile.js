import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Post from './Post';

//TO-DO----
//Get friends list and render
//Get liked posts

const Profile = () => {
    const [userDetails, setUserDetails] = useState()
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


    return (
        <div>
            {
                userDetails ?
                    <div>
                        <h1>{userDetails.username}</h1>
                        <h3>My Posts</h3>
                        <Post />
                    </div>
                    :
                    <div>Loading...</div>
            }
        </div>
    )
}

export default Profile;