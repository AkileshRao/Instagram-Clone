import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import './Main.scss';
import { Menu, MenuItem } from '@material-ui/core';
import { Home, Search, AddAPhoto, FavoriteBorder, AccountCircle } from '@material-ui/icons';
import { Switch, Route } from 'react-router-dom';
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
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        console.log("I fire");
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

    return (
        <div className='main'>
            <div className="header">
                <img src="/inst.png" alt="instagram" />
                <img src="/user.png" alt="user" aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => setAnchorEl(event.currentTarget)} />
            </div>
            <Switch>
                <Route path='/home' component={Posts} />
                <Route path='/profile' component={Profile} />
            </Switch>
            <div className="footer">
                <Home style={{ fontSize: "2em" }} />
                <Search style={{ fontSize: "2em" }} />
                <AddAPhoto onClick={() => setOpen(true)} style={{ fontSize: "2em" }} />
                <FavoriteBorder style={{ fontSize: "2em" }} />
                <AccountCircle style={{ fontSize: "2em" }} />
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
                <Dialog fullScreen open={open} onClose={() => setOpen(false)} TransitionComponent={Transition}>
                    <AppBar style={{ position: "relative" }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            Add a post
                        </Toolbar>
                    </AppBar>

                </Dialog>
            </div>
        </div>
    )
}

export default Main
