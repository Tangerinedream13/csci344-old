// import React from "react";

// export default function Stories({ token }) {
//     return (
//         <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
//             Stories go here. Fetch data from /api/stories
//         </header>
//     );
// }

import React, { useEffect, useState } from "react";

export default function Stories({ token }) {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStories() {
            const response = await fetch("/api/stories", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setStories(data);
            setLoading(false);
        }
        fetchStories();
    }, [token]);

    if (loading) return <p>Loading stories...</p>;

    return (
        <header className="flex gap-4 bg-white border p-4 overflow-x-auto mb-6">
            {stories.length > 0 ? (
                stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center w-16">
                        <div className="w-14 h-14 rounded-full overflow-hidden border">
                            <img
                                src={story.imageUrl}
                                alt={`${story.username}'s story`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-xs mt-1 text-center truncate">{story.username}</p>
                    </div>
                ))
            ) : (
                <p>No stories available</p>
            )}
        </header>
    );
}
