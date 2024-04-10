import './Nav.css'
import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Nav = () => {
    
    const {user, setUser} = useContext(UserContext);

    const logout = () => {
        setUser({...user, username: ''});
        localStorage.clear();
    }

    return (
        <> 
        
        <div className="myhomediv">
            <Link to={"/"}>
                <img className="bookies-logo" src={require("/src/assets/Bookieslogo3.png")} alt="Bookies logo" />
            </Link>
            <div className="signupbuttons">
                <Stack direction="row" spacing={2}>
                    {user.username ?
                    <>
                    <Link to={"/"} className="text-decoration-none">
                        <h6 id="friends-btn">Feed</h6>
                    </Link>
                    <Link to={"/Friends"} className="text-decoration-none">
                        <h6 id="friends-btn">Friends</h6>
                    </Link>
                    <Link to={"/MyBooks"} className="text-decoration-none">
                        <h6 id="mybooks-btn">My Books</h6>
                    </Link>
                    <Link to={"/FindBooks"} className="text-decoration-none">
                        <h6 id="findbooks-btn">Search</h6>
                    </Link>
                    <Link to={"/"} className="logout-btn text-decoration-none">
                        <h6 id="logout-btn" onClick={logout}>Log Out</h6> 
                    </Link>
                    <Link to={"/Profile"} className="text-decoration-none">
                        <h6 id="currentuser">{user.username}</h6>
                    </Link>
                    </>
                    :
                    <>
                    <Link to={"/signup"} className="text-decoration-none">
                        <h6 className="login-btn">Sign Up</h6>
                    </Link>
                    <Link to={"/login"} className="text-decoration-none">
                        <h6 className="login-btn">Login</h6>
                    </Link>
                    </>
                    }
                </Stack>
            </div>
        </div>
        </>
      )};

export default Nav;