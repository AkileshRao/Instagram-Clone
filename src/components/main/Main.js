import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import './Main.scss';
import { Menu, MenuItem } from '@material-ui/core';

function Main() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    useEffect(() => {
        console.log("I fire");
        auth.onAuthStateChanged((user) => {
            if (!user) history.push('/auth');
        });

        // db.collection('posts').get().then(res => {
        //     // res.forEach(doc => {
        //     //     console.log(doc.data());
        //     // })
        // })
    }, []);

    const logOut = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            auth.signOut();
        }, 1000);
    }

    const addPost = () => {
        db.collection("posts").add({
            name: "akileshrao",
            caption: "testing",
            img: "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/IMG_%28business%29.svg/1200px-IMG_%28business%29.svg.png"
        }).then(doc => console.log("Doc ID : ", doc.id))
            .catch(err => console.log(err));
    }

    return (
        <div className='main'>

            <div className="header">
                <img src="/inst.png" alt="instagram" />
                <img src="/user.png" alt="user" aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => setAnchorEl(event.currentTarget)} />
            </div>

            <h1>Main</h1>
            <button onClick={() => addPost()}>Add Post</button>


            {/* --------------------------------------------------------------------------------- */}

            <ToastContainer position="top-center" />
            <Menu
                id="simple-menu"
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem >Profile</MenuItem>
                <MenuItem >My account</MenuItem>
                <MenuItem onClick={() => logOut()}>Logout</MenuItem>
            </Menu>
            <Loader
                visible={loading}
                type="Grid"
                color="#00BFFF"
                height={60}
                width={60}
                className='loader'
            />
        </div>
    )
}

export default Main
