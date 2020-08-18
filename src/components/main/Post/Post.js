import React from 'react'
import { AccountCircle, FavoriteBorder, CommentOutlined } from '@material-ui/icons';
import './Post.scss';
const Post = ({ name, img, caption, likes }) => {
    return (
        <div className='post'>
            <div className="post__top">
                <AccountCircle style={{ "fontSize": "2em", "marginRight": "0.1em" }} />
                <p>{name}</p>
            </div>
            <div className="post__mid">
                <img src={img} alt="image" />
                <div className="actions">
                    <div style={{ display: "flex" }} >
                        <FavoriteBorder style={{ 'fontSize': '2em', 'marginRight': '0.1em' }} />
                        <CommentOutlined style={{ 'fontSize': '2em', 'marginTop': '0.05em' }} />
                    </div>
                    <p>{likes} likes</p>
                </div>
            </div>
            <div className="post__bot">
                <p className='name'>{name}</p>
                <p>{caption}</p>
            </div>
        </div>
    )
}

export default Post
