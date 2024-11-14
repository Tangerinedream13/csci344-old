import React, {useState} from "react"; 
import { postDataToServer, deleteDataFromServer } from "../server-requests"


// Job:
    // 1. Renders the bookmark (reflecting whether
    // the current user has bookmarked or not)
    // 2. Create / delete bookmarks

export default function Bookmark({ token, bookmarkId, postId }) {
    const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);


    async function createBookmark() {
        const sendData = {
            post_id: postId,
        };
        const responseData = await postDataToServer(
            token, 
            "/api/bookmarks/", 
            sendData
        );
        console.log(responseData);
        setStateBookmarkId(responseData.id);
    }

    async function deleteBookmark() {
        console.log("deleting a bookmark...")
        const responseData = await deleteDataFromServer(
            token, 
            "/api/bookmarks/", + stateBookmarkId
        );
        console.log(responseData);
        setStateBookmarkId(responseData.id);
    }
    console.log(stateBookmarkId);
    if (stateBookmarkId) {
        return (
            <button 
            ariaLabel="Bookmark This Post" 
            ariaChecked="true" 
            ariaRole="toggle" 
            onClick={deleteBookmark}
            >
                <i className="fas fa-bookmark"></i>
            </button>
        );
    } else {
        return (
            <button 
            ariaLabel="Bookmark This Post" 
            ariaChecked="false" 
            ariaRole="toggle" 
            onClick={createBookmark}
            >
                <i className="far fa-bookmark"></i>
            </button>
        );
    }
}

