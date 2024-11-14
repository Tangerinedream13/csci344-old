// import React from "react"

// export default function Like({ likeId }) {
//     console.log(likeId);
//         if (likeId) {
//             return (
//                 <button>
//                     <i className="fas text-red-700 fa-heart"></i>
//                 </button>
//             );
//         } else {
//             return (
//                  <button>
//                     <i className="far fa-heart"></i>
//                 </button>
//             );
//         }
//     }

import React, { useState } from "react";

export default function LikeButton({ token, postId, initialLikeId }) {
    const [likeId, setLikeId] = useState(initialLikeId);

    async function handleLike() {
        try {
            const response = await fetch(`/api/posts/${postId}/likes`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setLikeId(data.id); // Store the like ID to indicate the post is liked
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    }

    async function handleUnlike() {
        try {
            await fetch(`/api/posts/${postId}/likes/${likeId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLikeId(null); // Clear the like ID to indicate the post is unliked
        } catch (error) {
            console.error("Error unliking the post:", error);
        }
    }

    return (
        <button onClick={likeId ? handleUnlike : handleLike} aria-label={likeId ? "Unlike" : "Like"}>
            <i className={likeId ? "fas fa-heart text-red-700" : "far fa-heart"}></i>
        </button>
    );
}

    
