// npm install react-multi-carousel --save
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '/src/context/UserContext.tsx';

import './FriendCurrent.css';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  
  const FriendCurrent = () => {
    
    const [friendsCurrent, setFriendsCurrent] = useState([]);
    const [wasran, setWasran] = useState(false)
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
      if (wasran == false){
        getCurrents(user.username)
      }}, [wasran]);

    const getCurrents = async (username) => {
      const response = await fetch(`http://127.0.0.1:5000/auth_api/friends_current/${username}`);
      if (response.ok) {
          const data = await response.json();
          console.log(data)
          setFriendsCurrent(data.friends_current)
          setWasran(true)
      } else {
          console.log('error');
      }
    };
    
    return (
    <div className="roulette-container">
        <h2>Friends Current Reading</h2>
        <Carousel responsive={responsive}>
            {friendsCurrent ? friendsCurrent.map((item, idx) => 
            <div className="carousel-img book" key={idx}>
              <img className="cover-img" src={item.thumbnail} alt="" />
              <p className="friendsnames">{item.username}</p>
            </div>):
            <div className="carousel-img book">
              <img className="cover-img" src="https://as1.ftcdn.net/v2/jpg/00/34/96/92/1000_F_34969260_udCGmVHeLaIEkUh0L6UeCHwEbXALoJIZ.jpg" alt="" />
              <p className="friendsnames">No friends reading yet! Go make some more!</p>
          </div>}          
        </Carousel>
    </div>
  );
    }
  export default FriendCurrent;