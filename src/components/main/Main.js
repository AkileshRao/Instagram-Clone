import React, { useState, useEffect, useContext } from 'react';
import { auth, db, storage } from '../../firebase';
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import './Main.scss';
import { Menu, MenuItem } from '@material-ui/core';
import { Home, Search, AddAPhoto, FavoriteBorder, AccountCircle, Image } from '@material-ui/icons';
import { Switch, Route } from 'react-router-dom';
import { PostContext } from '../../state/PostProvider';
import Posts from './Posts/Posts';
import Profile from './Profile/Profile';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Main() {
    const history = useHistory();
    const [posts, setPosts] = useContext(PostContext);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) history.push('/auth');
        });
    }, []);

    const logOut = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            auth.signOut();
        }, 1000);
    }

    const handleUpload = (e) => {
        setFile(e.target.files[0]);
    }

    const addPost = () => {
        setLoading(true);
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on('state_changed', (snapShot) => {
            console.log(snapShot);
        }, err => {
            console.log(err);
        }, () => {
            storage.ref('images').child(file.name).getDownloadURL().then(firebaseUrl => {
                const post = {
                    name: "akileshrao",
                    caption: caption,
                    img: firebaseUrl,
                    likes: 0
                }
                db.collection('posts').add(post).then(res => {
                    setLoading(false);
                    setOpen(false);
                    setFile(null);
                    setPosts([...posts, post]);
                    toast.success("Your post has been uploaded");
                }, err => {
                    console.log(err);
                })
            })
        })

    }

    return (
        <div className='main'>
            <div className="header">
                <img src="/inst.png" alt="instagram" />
                <img src="/user.png" alt="user" aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => setAnchorEl(event.currentTarget)} />
            </div>
            <Switch>
                <Route exact path='/' component={Posts} />
                <Route path='/profile' component={Profile} />
            </Switch>
            <div className="footer">
                <Home onClick={() => history.push('/')} style={{ fontSize: "2em" }} />
                <Search style={{ fontSize: "2em" }} />
                <AddAPhoto onClick={() => setOpen(true)} style={{ fontSize: "2em" }} />
                <FavoriteBorder style={{ fontSize: "2em" }} />
                <AccountCircle onClick={() => history.push('/profile')} style={{ fontSize: "2em" }} />
            </div>



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

            <div>
                <Dialog fullScreen open={open} onClose={() => setOpen(false)} TransitionComponent={Transition} >
                    <AppBar style={{ position: "relative", color: "gray", background: "white", boxShadow: "none" }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={() => { setOpen(false); setFile(null) }} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            Add a post
                        </Toolbar>
                    </AppBar>

                    {file ?
                        <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100%" }} >
                            <img src={URL.createObjectURL(file)} alt="img" style={{
                                "object-fit": "cover",
                                height: "100%",
                                width: "100%",
                                minHeight: "275px",
                                maxHeight: "375px"
                            }} />

                            <textarea rows='5' placeholder='Provide a caption' style={{ width: '100%' }} onChange={(event) => setCaption(event.currentTarget.value)} />
                            <button className='upload_button' onClick={() => addPost()} >Upload</button>
                        </div> :
                        <div onClick={() => document.getElementById('insta_post').click()} className="add__post__body" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(243,243,243)" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "gray" }}>
                                <Image style={{ fontSize: "6em" }} />
                                <p style={{ fontSize: "1.5em", fontWeight: "700", margin: "0 0 2em 0" }}>Choose a file</p>
                            </div>
                        </div>}
                    <input type="file" id="insta_post" onChange={(event) => handleUpload(event)} style={{ display: 'none' }} />
                </Dialog>
            </div>
        </div>
    )
}

export default Main
