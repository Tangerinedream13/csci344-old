import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "maria";
let password = "password";

async function initializeScreen() {
    token = await getAccessToken(rootURL, username, password);
    showNav();
    getPosts();
    getSuggestions();
    getStories(); 
    getProfile();
}

async function getProfile() {
    // go out to the internet, get suggestions, and then bring them down to my browser.
    const endpoint = "https://photo-app-secured.herokuapp.com/api/profile/";
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }); 
    const profile = await response.json();
    console.log(profile);
    
showProfile(profile); 

}

function showProfile(profile) {
    document.querySelector("#profile").innerHTML = `
    <img src="https://picsum.photos/60/60?q=11" class="rounded-full w-16" />
    <h2 class="font-Comfortaa font-bold text-2xl">maria</h2>
    `;
}


function showNav() {
    document.querySelector("#nav").innerHTML = `
        <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
/**
 * Goal: We wat to generate our posts from data.
 *      1. Go out to the internet and fetch all of our posts.
 *      2. Once our posts come back, we want to loop through each pst,
 *         and append each post to the correct place in our HTML.
 */

async function getPosts() {
    const endpoint =
        "https://photo-app-secured.herokuapp.com/api/posts/?limit=10";
    // get the HTTP response header:
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    // get the HTTP body (JSON object):
    const posts = await response.json();

    // print the data to the console:
    console.log(posts);

    // invoke this function to actually  draw the posts to the screen:
    showPosts(posts);
}


async function getSuggestions() {
    // go out to the internet, get suggestions, and then bring them down to my browser.
    const endpoint = "https://photo-app-secured.herokuapp.com/api/suggestions/";
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }); 
    const suggestions = await response.json();
    console.log(suggestions);
    
showSuggestions(suggestions); 

}

function showSuggestions(suggestions) {
    // Get a reference to the HTML tag where we want to add the suggestions
    const suggestionsEl = document.querySelector("#suggestions");

    // Loop through each suggestion and append an HTML representation of it to the DOM
    suggestions.forEach(suggestion => {
        const template = `
            <section class="flex justify-between items-center mb-4 gap-2">
                <img src="${suggestion.thumb_url}" class="rounded-full" />
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${suggestion.username}</p>
                    <p class="text-gray-500 text-xs">suggested for you</p>
                </div>
                <button class="text-blue-500 text-sm py-2">follow</button>
            </section>
        `;
        suggestionsEl.insertAdjacentHTML("beforeend", template);
    });
}

async function getStories() {
    // go out to the internet, get suggestions, and then bring them down to my browser.
    const endpoint = "https://photo-app-secured.herokuapp.com/api/stories/";
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }); 
    const stories = await response.json();
    console.log(stories);
    
showStories(stories); 

}

function showStories(stories) {
    // Get a reference to the HTML tag where we want to add the stories
    const storiesEl = document.querySelector("#stories");

    // Loop through each story and append an HTML representation of it to the DOM
    console.log(stories);
    stories.forEach(story => {
        const template = `
            <div class="flex flex-col justify-center items-center">
            <img src="${story.user.thumb_url}" class="rounded-full border-4 border-gray-300" />
                <p class="text-xs text-gray-500">${story.user.username}</p></div>
        `;
        storiesEl.insertAdjacentHTML("beforeend", template);
    });
}    

    
function showPosts(posts) {
    // get a reference to the HTML tag where we want to add the posts:
    const mainEl = document.querySelector("main");

    // loop through each post and append an HTML respresentation of the post to the DOM:
    posts.forEach(post => {
        const template = ` 
        <section class="bg-white border mb-10">
        <div class="p-4 flex justify-between">
            <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
            <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
        </div>
        <img src="${post.image_url}" alt="${post.alt_text}" width="300" height="300"
            class="w-full bg-cover">
        <div class="p-4">
            <!-- button panel -->
            <div class="flex justify-between text-2xl mb-3">
                <div>
                    ${ getLikeButton(post) }
                    <button><i class="far fa-comment"></i></button>
                    <button><i class="far fa-paper-plane"></i></button>
                </div>
                <div>
                    ${ getBookmarkButton(post) }
                </div>
            </div>

            <!-- number of likes -->
            <p class="font-bold mb-3">${post.likes.length} like(s)</p>

            <!-- caption from the person who created the post -->
            <div class="text-sm mb-3">
                <p>
                    <strong>${post.user.username}</strong>
                    ${post.caption}
                </p>
            </div>

            <!-- comments (2) -->
            ${showComments(post.comments)}
            

            <!-- when posted -->
            <p class="uppercase text-gray-500 text-xs">${post.display_time}</p>
        </div>
        <div class="flex justify-between items-center p-3">
            <div class="flex items-center gap-3 min-w-[80%]">
                <i class="far fa-smile text-lg"></i>
                <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
            </div>
            <button class="text-blue-500 py-2">Post</button>
        </div>
    </section>
    `;
    mainEl.insertAdjacentHTML("beforeend", template);
});
}

// input: comments
// output: HTML string representing the comments
function showComments(comments) {
    if(comments.length > 1) {
        const lastComment = comments[comments.length-1];
        return `
            <button class="text-sm mb-3">view all ${comments.length} comments</button>
            <p class="text-sm mb-3">
            <strong>${lastComment.user.username}</strong> ${lastComment.text}
            </p>
        `;
    }
    if(comments.length === 1) {
        const lastComment = comments[0];
        return `<p class="text-sm mb-3">
            <strong>${comments[0].user.username}</strong> ${comments[0].text}
        </p>`
    }
        return '';
    }

    function getLikeButton(post) {
        if (post.current_user_like_id) {
            return `<button onclick="unlike(${post.current_user_like_id})"><i class="fa-solid text-red-700 fa-heart"></i></button>`;
        } else {
        // not liked
            return `
                <button onclick="createLike(${post.id})">
                    <i class="fa-regular fa-heart"></i>
                </button>`;
        }
    }
   
    function getBookmarkButton(post) { 
        // already bookmarked
        if (post.current_user_bookmark_id) {
            return `<button onclick="deleteBookmark(${post.current_user_bookmark_id})"><i class="fa-solid fa-bookmark"></i></button>`;
        } else {
        // not bookmarked
            return `
                <button onclick="createBookmark(${post.id})">
                    <i class="far fa-bookmark"></i>
                </button>`;
        }
    }
    
  window.createBookmark = async function(postID) {
        const postData = {
            post_id: postID,
        };
        
        const response = await fetch(
            "https://photo-app-secured.herokuapp.com/api/bookmarks/", 
            {
            method: "POST", // create new resource on the server
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(postData), // the data that's getting sent to the server
        });
        const data = await response.json();
        console.log(data);
}
    
window.deleteBookmark = async function(bookmarkId) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }); 
    const data = await response.json();
    console.log(data);
    };


window.createLike = async function(postID) {
        const postData = {
            post_id: postID,
        };
        
        const response = await fetch(
            `https://photo-app-secured.herokuapp.com/api/likes/`,
            {
            method: "POST", // create new resource on the server
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(postData), // the data that's getting sent to the server
        });
        const data = await response.json();
        console.log(data);
}

window.unlike = async function(likeID) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/likes/${likeID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }); 
    const data = await response.json();
    console.log(data);
    };


// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen(); 