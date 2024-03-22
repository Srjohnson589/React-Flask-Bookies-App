import Nav from '/src/components/Nav/Nav.tsx';
import Roulette from '/src/components/home/Roulette/Roulette.tsx'
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

const Home = () => {
    
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          console.log(loggedInUser);
          setUser({'username': loggedInUser})
        }
      }, []);

    return (
        <> 
          <Nav/>
          <Roulette />
          {user.username === '' &&
          <h2 id="signup-heading">Sign up to find friends and start your book list!</h2>}
          {user.username && 
          <h2 >Welcome back, {user.username}!</h2>}
        </>
    )
    }

export default Home;