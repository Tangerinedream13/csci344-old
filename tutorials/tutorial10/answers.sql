-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;
--This is how you comment :) 


-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name 
FROM users;


-- Exercise 3: Sorting
SELECT id, first_name, last_name
FROM users
ORDER BY last_name;


-- Exercise 4: Filtering
SELECT id, user_id, image_url
FROM posts
WHERE user_id = 26 or user_id = 12; 


-- Exercise 5: Filtering with logical operators
SELECT id, user_id, image_url
FROM posts
WHERE user_id = 26 and user_id = 12


-- Exercise 6: Using functions in a select statement
SELECT COUNT(*) post_count
FROM posts;


-- Exercise 7: Aggregating data
SELECT 
    user_id,
    COUNT(*) AS comment_count
FROM 
    comments
GROUP BY 
    user_id
ORDER BY 
    comment_count DESC;

-- Exercise 8: Joining: two tables
--Write a query to retrieve the id, image_url, 
--and user_id for the posts created by either Nicholas Khan (user_id=26) 
--or Rebecca Brown (user_id=12) – just like in #5. 
--However, this time you will also join on the users table so that you can also 
--display the username, first_name, and last_name of the creators.
SELECT image_url, user_id, posts.user_id, 
users.username, users.first_name, users.last_name
FROM posts
JOIN users 
    ON users.id = posts.user_id
WHERE users.id = 26 or users.id = 12; 


-- Exercise 9: More joining practice: two tables
SELECT 
    posts.id,
    posts.pub_date, 
    following.following_id
FROM 
    posts
JOIN 
    following
ON 
    posts.user_id = following.following_id
WHERE 
    following.user_id = 26; 



-- Exercise 10: More joining practice: three tables (Optional)
SELECT 
    posts.id, 
    posts.pub_date, 
    following.following_id, 
    user.username
FROM 
    posts
JOIN 
    following 
ON 
    posts.user_id = following.following_id
JOIN 
    users
ON 
    posts.user_id = users.id
WHERE 
    following.user_id = 26
ORDER BY 
    posts.pub_date DESC; 

-- Exercise 11: Inserting records
INSERT INTO bookmarks(user_id, post_id)
VALUES (219, 220, 221);

-- Specific example:
-- Note that now() is a built-in PostgreSQL function that gets the current timestamp.
INSERT INTO comments (text, user_id, post_id)
VALUES('Great photo!', 5, 3, now());





-- Exercise 12: Deleting records
DELETE FROM table_name
WHERE condition;

-- specific example:
DELETE FROM comments
WHERE id = 1;



-- Exercise 13: Updating records
UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;

-- specific example:
UPDATE posts
SET caption = 'This is my dog' 
WHERE id = 3;



-- Exercise 14: More Querying Practice (Optional)
