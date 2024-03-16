import './Home.css'
import { useState } from 'react';
// import Login from '/src/components/home/Login/Login.tsx';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    return (
        <> 
        
        <div className="myhomediv">
            <img className="bookies-logo" src="/src/assets/images/Bookieslogo.png" alt="" />
            <div className="signupbuttons">
                <Stack direction="row" spacing={2}>
                    {user.username ?
                    <>
                    <Link to={"/"} className="text-decoration-none">
                        <Button variant="contained">Log Out
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