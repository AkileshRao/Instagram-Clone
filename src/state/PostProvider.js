import React, { useState, createContext, useEffect } from 'react';
import { db } from '../firebase';

export const PostContext = createContext();

export const PostProvider = props => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').get().then(res => {
            let postsArr = [];
            res.forEach(doc => {
                console.log(doc.data());
                postsArr.push(doc.data());
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

