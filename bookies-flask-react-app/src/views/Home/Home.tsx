import './Home.css'
import { useState, useContext } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import UserContextProvider, { UserContext } from '../../context/UserContext';

const Home = () => {
    
    const {user, setUser} = useContext(UserContext);

    const logout = () => {
        setUser({username: ''})
    }

    return (
        <> 
        
        <div className="myhomediv">
            <img className="bookies-logo" src="/src/assets/images/Bookieslogo.png" alt="" />
            <div className="signupbuttons">
                <Stack direction="row" spacing={2}>
                    {user.username ?
                    <>
                    <h6>{user.username}</h6>
                    <Link to={"/"} className="text-decoration-none">
                        <Button onClick={logout} variant="contained">Log Out
                        </Button> 
                    </Link>
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
    )
    }

export default Home