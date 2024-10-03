// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.

const search = (ev) => {
    ev.preventDefault(); // overrides default button action

    // Get user's preferences:
    const searchTerm = document.querySelector("#search_term").value;
    const openOnly = document.querySelector("#is_open").checked;

    // Pass the user's preferences into the showData function
    showData(searchTerm, openOnly);
};

// Part 1.1a
const filterClassFull = (course) => {
    return course.EnrollmentCurrent < course.EnrollmentMax;
};

// Part 1.1b
const filterTermMatched = (course, searchTerm) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    //return
};

// Part 1.2
const dataToHTML = (course) => {
    // modify this
    return `
    <div class="course">
        <h2>${course.Code}: ${course.Title}</h2>
        <p><strong>Instructor:</strong> ${course.Instructors.map(i => i.Name).join(", ")}</p>
        <p><strong>Days:</strong> ${course.Days}</p>
        <p><strong>Time:</strong> ${new Date(course.StartTime).toLocaleTimeString()} - ${new Date(course.EndTime).toLocaleTimeString()}</p>
        <p><strong>Location:</strong> ${course.Location.FullLocation}</p>
        <p><strong>Enrollment:</strong> ${course.EnrollmentCurrent}/${course.EnrollmentMax}</p>
    </div>
`;
};

// Part 2
const showData = (searchTerm, openOnly) => {
    console.log(searchTerm, openOnly);
    console.log(data); // imported from course-data.js
    // Your code here:

    // Function to show the filtered courses based on the search term and openOnly flag
const showData = (searchTerm, openOnly) => {
    // Filter data based on user's input:
    let filteredData = data;

    // Apply the filter for term matching, if a search term is provided
    if (searchTerm) {
        filteredData = filteredData.filter(course => filterTermMatched(course, searchTerm));
    }

    // Apply the filter to show only open courses, if the openOnly checkbox is checked
    if (openOnly) {
        filteredData = filteredData.filter(filterClassFull);
    }

    // Map the filtered data to an array of HTML strings
    const htmlString = filteredData
        .map(course => dataToHTML(course))
        .join(""); // Join all the HTML strings into one

    // Clear out the existing courses in the DOM
    const coursesContainer = document.querySelector("#courses-container");
    coursesContainer.innerHTML = ""; // Clear current content

    // Insert the generated HTML into the DOM
    coursesContainer.insertAdjacentHTML("beforeend", htmlString);
};

// Attach the search function to the button's click event
document.querySelector("button").addEventListener("click", search);


};
