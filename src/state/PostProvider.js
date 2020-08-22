import React, { useState, createContext, useEffect } from 'react';
import { db } from '../firebase';

export const PostContext = createContext();

export const PostProvider = props => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').get().then(res => {
            let postsArr = [];
            res.forEach(doc => {
                postsArr.push({ id: doc.id, ...doc.data() });
            })
            setPosts(postsArr);
        })
    }, []);

    return (
        <PostContext.Provider value={[posts, setPosts]}>
            {props.children}
        </PostContext.Provider>
    )
}

