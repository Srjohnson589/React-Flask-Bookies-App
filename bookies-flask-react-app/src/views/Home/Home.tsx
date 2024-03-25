import Nav from '/src/components/Nav/Nav.tsx';
import FriendCurrent from '/src/components/home/FriendCurrent/FriendCurrent.tsx';
import Current from '/src/components/home/Current/Current.tsx'
import { useContext, useEffect } from 'react';
import { UserContext } from '/src/context/UserContext.tsx';

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
          <FriendCurrent />
          {user.username === '' &&
          <h2 id="signup-heading">Sign up to find friends and start your book list!</h2>}
          {user.username && 
          <h2 >Welcome back, {user.username}!</h2>}
          <Current />
        </>
    )
    }

export default Home;