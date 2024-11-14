// import React from "react";

// export default function Profile({ token }) {
//     return (
//         <header className="flex gap-4 items-center">
//             <p>Profile Goes Here. Fetch data from /api/profile/ endpoint.</p>
//         </header>
//     );
// }

import React, { useEffect, useState } from "react";

export default function Profile({ token }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            const response = await fetch("/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProfile(data);
            setLoading(false);
        }
        fetchProfile();
    }, [token]);

    if (loading) return <p>Loading profile...</p>;

    return (
        <aside className="flex gap-4 items-center p-4 border rounded bg-white">
            {profile ? (
                <>
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                            src={profile.avatarUrl}
                            alt={`${profile.username}'s avatar`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{profile.username}</h2>
                        <p className="text-sm text-gray-600">{profile.bio}</p>
                    </div>
                </>
            ) : (
                <p>No profile data available.</p>
            )}
        </aside>
    );
}
