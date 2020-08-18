import React, { useContext } from 'react';
import { PostContext } from '../../../state/PostProvider';
import Post from '../Post/Post';

function Posts() {
    const [posts, setPosts] = useContext(PostContext)
    return (
        <div>
            {posts && posts.map((post, i) => {
                return (
                    <Post name={post.name} img={post.img} caption={post.caption} likes={post.likes} />
                )
            })}
        </div>
    )
}

export default Posts
