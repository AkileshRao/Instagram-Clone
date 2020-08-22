import React, { useContext } from 'react'
import { AccountCircle } from '@material-ui/icons';
import { PostContext } from '../../../state/PostProvider';
import './Profile.scss';

function Profile() {
    const [posts, setPosts] = useContext(PostContext);
    return (
        <div className='profile'>
            <div className="top">
                <AccountCircle style={{ fontSize: "4em", marginRight: "0.2em" }} />
                <h3>akileshrao</h3>
            </div>
            <div className="posts">
                {posts && posts.map(post => {
                    return <img src={post.img} alt='img' />
                })}
            </div>
        </div>
    )
}

export default Profile
