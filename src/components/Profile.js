import { useEffect, useState } from "react";
import { useParams } from "react-router";

//TO-DO----
//Get current users details
//Get friends list same as above res
//Get users posts
//Get liked posts

const Profile = () => {
    const [userDetails, setUserDetails] = useState()
    const { id } = useParams();

    useEffect(() => {
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

                if (response.status === 200) {
                    setUserDetails(data)
                }
            } catch (err) {
                throw err
            }
        }

        getUsersDetails()

    }, [id])

    console.log(userDetails)
    return (
        <div>

        </div>
    )
}

export default Profile;