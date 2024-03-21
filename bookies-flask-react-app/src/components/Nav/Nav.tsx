import './Nav.css'
import { useState, useContext } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Nav = () => {
    
    const {user, setUser} = useContext(UserContext);

    const logout = () => {
        setUser({username: ''});
        localStorage.clear();
    }

    return (
        <> 
        
        <div className="myhomediv">
            <img className="bookies-logo" src="/src/assets/images/Bookieslogo.png" alt="" />
            <div className="signupbuttons">
                <Stack direction="row" spacing={2}>
                    {user.username ?
                    <>
                    <Link to={"/"} className="logout-btn text-decoration-none">
                        <h6 id="logout-btn" onClick={logout} variant="contained">Log Out</h6> 
                    </Link>
                    <Link to={"/FindBooks"} className="text-decoration-none">
                        <Button id="findbooks-btn" variant="contained">Search</Button>
                    </Link>
                    <Link to={"/MyBooks"} className="text-decoration-none">
                        <Button id="mybooks-btn" variant="contained">My Books</Button>
                    </Link>
                    <h6 id="currentuser">{user.username}</h6>
                    </>
                    :
                    <>
                    <Link to={"/signup"} className="text-decoration-none">
                        <Button variant="contained">Sign Up
                        </Button>
                    </Link>
                    <Link to={"/login"} className="text-decoration-none">
                        <Button variant="contained" color="success">
                            Login
                        </Button>
                    </Link>
                    </>
                    }
                </Stack>
            </div>
        </div>
        </>
      )};

export default Nav;