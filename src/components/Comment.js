import { useEffect } from "react";

const Comment = ({ postID }) => {

    useEffect(() => {

        try {
            const getComments = async () => {
                const res = await fetch(`http://localhost:3000/${postID}/comments`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                });

                const data = await res.json()



            }

            getComments()
        } catch (error) {
            throw error
        }

    }, [postID])

    return (
        <div></div>
    )
}

export default Comment;