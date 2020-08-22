import React, { useContext, useEffect } from 'react';
import { PostContext } from '../../../state/PostProvider';
import Post from '../Post/Post';

function Posts() {
    const [posts, setPosts] = useContext(PostContext)

    return (
        <div style={{ height: "calc(100vh - 120px)" }} >
            {posts.length > 0 ? posts.map((post, i) => {
                return (
                    <Post name={post.name} img={post.img} caption={post.caption} likes={post.likes} key={post.id} id={post.id} />
                )
            }) :
                <h1>No posts found</h1>
            }

        </div>
    )
}

export default Posts
