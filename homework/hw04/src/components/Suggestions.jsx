// import React from "react";

// export default function Suggestions({ token }) {
//     return (
//         <div className="mt-4">
//             <p className="text-base text-gray-400 font-bold mb-4">
//                 Suggestions for you
//             </p>

//             <section className="flex justify-between items-center mb-4 gap-2">
//                 Suggestions go here. Fetch data from /api/suggestions endpoint.
//             </section>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";

export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSuggestions() {
            const response = await fetch("/api/suggestions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setSuggestions(data);
            setLoading(false);
        }
        fetchSuggestions();
    }, [token]);

    if (loading) return <p>Loading suggestions...</p>;

    return (
        <div className="mt-4">
            <p className="text-base text-gray-400 font-bold mb-4">
                Suggestions for you
            </p>

            {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                    <section key={suggestion.id} className="flex justify-between items-center mb-4 gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                    src={suggestion.avatarUrl}
                                    alt={`${suggestion.username}'s avatar`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{suggestion.username}</p>
                                <p className="text-xs text-gray-500">{suggestion.bio}</p>
                            </div>
                        </div>
                        <button className="text-blue-500 text-sm font-bold">Follow</button>
                    </section>
                ))
            ) : (
                <p>No suggestions available.</p>
            )}
        </div>
    );
}
