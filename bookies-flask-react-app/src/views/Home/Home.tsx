import Nav from '../../components/Nav/Nav.tsx';
import FriendCurrent from '../../components/home/FriendCurrent/FriendCurrent.tsx';
import Current from '../../components/home/Current/Current.tsx';
import Roulette from '../../components/home/Roulette/Roulette.tsx'
import './Home.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext.tsx';

interface Chat {
  role: "user" | "assistant" | undefined;
  content: string;
}

const Home = () => {
    
    const {user, setUser} = useContext(UserContext);
    const [chatopen, setChatopen] = useState(false);
    const [newInput, setNewinput] = useState<string[]>([]);
    const [chatrecord, setChatrecord] = useState<Chat[]>([]);
    const [typing, setTyping] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          console.log(loggedInUser);
          setUser({...user, 'username': loggedInUser})
        }
      }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://react-flask-bookies-app.onrender.com/reviews_api/chatgpt', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: chatrecord})
          });
          const data = await response.json()
          console.log(data)
          postReply(data.message)

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [newInput]);


    const postInput = async (m:string) => {
      setChatrecord((chatrecord) => [...chatrecord, {
        "role": "user",
        "content": m
      }]);
      setNewinput([...newInput, m])
    }

    const postReply = (r:string) => {
        setChatrecord([...chatrecord,{
          "role": "assistant",
          "content": r
        }])
        setTyping('')
    }
      
    return (
        <> 
          <Nav/>
          {user.username ?
          <>
          <FriendCurrent />
          <Current />
          </>:
          <>
          <Roulette/>
           <h2 id="signup-heading">Sign up to find friends and start your book list!</h2>
          </>
          }
          <img onClick={()=>{setChatopen(!chatopen)}} className="chatbot-icon" src="https://i.pinimg.com/originals/ff/fb/48/fffb481f28a395fb8ad93e7ecd8f2ec7.png" ></img>
          {chatopen && 
           <div className="chat-body">
              {chatrecord.map((item, index) => (
                <div className="convoline">
                  <p className={item.role} key={index}>{item.content}</p>
                </div>
              ))}
              <input
              value={typing}
              onKeyDown={(e) => {if(e.key === 'Enter'){postInput(typing)}}}
              onChange={(event)=>{setTyping(event.target.value)}}
              className="chat-input" 
              type="text" />
           </div>
          }
        </>
    )
    }

export default Home;