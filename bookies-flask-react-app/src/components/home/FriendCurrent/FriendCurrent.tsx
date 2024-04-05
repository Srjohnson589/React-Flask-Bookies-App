// npm install react-multi-carousel --save
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext.tsx';

import './FriendCurrent.css';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  interface Friend {
    thumbnail: string;
    username: string;
  }

  const FriendCurrent = () => {
    
    const [friendsCurrent, setFriendsCurrent] = useState<Friend[]>([]);
    const [nofriends, setNofriends] = useState(false)
    const [wasran, setWasran] = useState(false)
    const {user} = useContext(UserContext);

    useEffect(() => {
      if (wasran == false){
        getCurrents(user.username);
        }}, [wasran]);

    const getCurrents = async (username:string) => {
      const response = await fetch(`https://react-flask-bookies-app.onrender.com/auth_api/friends_current/${username}`);
      if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFriendsCurrent(data.friends_current);
          if ((data.friends_current).length === 0){
            setNofriends(true)
          } else {
            setNofriends(false)
          };
          setWasran(true)
      } else {
          console.log('error');
      }
    };
    
    return (
    <div className="roulette-container">
        <h2 className="friends-title">Friends Current Reading</h2>
        {nofriends && 
           <div className="book">
             <img id="cover-img" src="https://as1.ftcdn.net/v2/jpg/00/34/96/92/1000_F_34969260_udCGmVHeLaIEkUh0L6UeCHwEbXALoJIZ.jpg" alt="" />
             <p id="nofriends">No friends reading yet!<br/>Go make some more!</p>
          </div>
          }
        <Carousel responsive={responsive}>
            {friendsCurrent && friendsCurrent.map((item, idx) => 
            <div className="carousel-img book" key={idx}>
              <img id="cover-img" src={item.thumbnail} alt="" />
              <p id="friendsnames">{item.username}</p>
            </div>)}
        </Carousel>
    </div>
  );
    }
  export default FriendCurrent;