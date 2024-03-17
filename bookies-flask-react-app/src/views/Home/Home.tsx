import Nav from '/src/components/Nav/Nav.tsx'
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Home = () => {
    
    const {user, setUser} = useContext(UserContext);

    return (
        <> 
        <Nav/>
        <div>
        {user.username &&
            <Link to={"/FindBooks"} className="text-decoration-none">
            <Button id="findbooks-btn" variant="contained">Find Books
            </Button>
        </Link>}
        </div>
        </>
    )
    }

export default Home;