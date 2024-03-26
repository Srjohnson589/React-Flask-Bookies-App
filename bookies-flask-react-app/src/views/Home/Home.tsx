import Nav from '/src/components/Nav/Nav.tsx';
import FriendCurrent from '/src/components/home/FriendCurrent/FriendCurrent.tsx';
import Current from '/src/components/home/Current/Current.tsx'
import './Home.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '/src/context/UserContext.tsx';

const Home = () => {
    
    const {user, setUser} = useContext(UserContext);
    const [chatopen, setChatopen] = useState(false);
    const [newInput, setNewinput] = useState([]);
    const [chatrecord, setChatrecord] = useState([{
      "role": "system",
      "content": "You are a helpful librarian, giving concise but descriptive responses. If you receive a blank input do not reply."
    }]);
    const [typing, setTyping] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          console.log(loggedInUser);
          setUser({'username': loggedInUser})
        }
      }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/reviews_api/chatgpt', {
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


    const postInput = async (m) => {
      setChatrecord((chatrecord) => [...chatrecord, {
        "role": "user",
        "content": m
      }]);
      setNewinput([...newInput, m])
    }

    const postReply = (reply) => {
        setChatrecord([...chatrecord,{
          "role": "assistant",
          "content": reply
        }])
        setTyping('')
    }
      
    return (
        <> 
          <Nav/>
          <FriendCurrent />
          {user.username === '' &&
          <h2 id="signup-heading">Sign up to find friends and start your book list!</h2>}
          {user.username && 
          <h2 >Welcome back, {user.username}!</h2>}
          <Current />
          <img onClick={()=>{setChatopen(!chatopen)}} className="chatbot-icon" src="https://i.pinimg.com/originals/ff/fb/48/fffb481f28a395fb8ad93e7ecd8f2ec7.png" ></img>
          {chatopen && 
           <div className="chat-body">
              <p className="bot">I am your AI assistant! How can I help you today?</p>
              {chatrecord.map((item, index) => (
                <p key={index}>{item.content}</p>
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