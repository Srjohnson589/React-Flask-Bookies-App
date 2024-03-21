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
        <div className="transparency-container">
          <Nav/>
          <Roulette />
        </div>
        </>
    )
    }

export default Home;