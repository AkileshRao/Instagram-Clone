import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import './Main.scss';

function Main() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) history.push('/auth');
        })
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
            <Loader
                visible={loading}
                type="Grid"
                color="#00BFFF"
                height={60}
                width={60}
                className='loader'
            />
            <div className="header">
                <img src="/inst.png" alt="instagram" />
                <img src="/user.png" alt="user" />
            </div>
            <Menu>
                <MenuItem>1</MenuItem>
                <SubMenu title="2">
                    <MenuItem>2-1</MenuItem>
                </SubMenu>
            </Menu>
            <h1>Main</h1>
            <button onClick={() => logOut()}>Sign Out</button>
            <ToastContainer position="top-center" />
        </div>
    )
}

export default Main
