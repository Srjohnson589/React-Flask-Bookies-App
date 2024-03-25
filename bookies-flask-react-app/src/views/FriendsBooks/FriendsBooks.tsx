import Nav from '/src/components/Nav/Nav.tsx'
import './FriendsBooks.css'
import { UserContext } from '../../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';

import CheckIcon from '@mui/icons-material/Check';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Tooltip } from '@mui/material';

const FriendsBooks = () => {

  const {user, setUser} = useContext(UserContext);
  const location = useLocation();
  const { friend } = location.state;
  const [toRead, setToRead] = useState([]);
  const [current, setCurrent] = useState([]);
  const [read, setRead] = useState([]);
  
  useEffect(() => {
    if (Object.keys(user).length === 0 && user.constructor === Object){
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        console.log(loggedInUser);
        setUser({...user, 'username': loggedInUser})
      }
    }}, [user]);
    
  useEffect(() => {getShelves(friend)}, []);
  
  const getShelves = async (username) => {
    const response = await fetch('http://127.0.0.1:5000/books_api/show_shelves', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username})
    })
    const data = await response.json();
    
    setToRead(data.to_read_shelf);
    setCurrent(data.current_shelf);
    setRead(data.read_shelf);
  }

  const makeCurrent = async (t) => {
    const title = t;
    console.log(title);
    const response = await fetch('http://127.0.0.1:5000/books_api/add_friends_current', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    alert('Added to your current shelf')
  }

  const makeRead = async (t) => {
    const title = t;
    console.log(title);
    const response = await fetch('http://127.0.0.1:5000/books_api/add_friends_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    alert('Added to your Already Read shelf')
  }

  const makeToRead = async (t) => {
    const title = t;
    console.log(title);
    const response = await fetch('http://127.0.0.1:5000/books_api/add_friends_to_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    alert('Added to your To Read shelf')
  }

  return (
    <>
        <Nav/>
        <h1 className="shelf-h">{friend}'s Bookshelves</h1>
        <div className="shelf-backdrop">
          <p className="shelf-title">To Read</p>
          <div className="shelf">
              {toRead && toRead.map((book, idx) => 
              <>
                <div key={idx} className="bookcard">
                  <Link to={"/Book"} state={{ title: `${book.title}`}}>
                     <img className="shelf-covers" src={book.thumbnail}></img>
                  </Link>
                  <div>
                    <Tooltip title="Finished"><CheckIcon className="list-icons" onClick={() => makeRead(book.title)} /></Tooltip>
                    <Tooltip title="Current"><StarBorderIcon className="list-icons" onClick={() => makeCurrent(book.title)}/></Tooltip>
                    <Tooltip title="To Read"><BookmarkBorderIcon className="list-icons" onClick={() => makeToRead(book.title)}/></Tooltip>
                  </div>
                </div>
              </>
              )}
          </div>
        </div>
        <div className="shelf-backdrop">
          <p className="shelf-title">Current Reading</p>
          <div className="shelf">
              {current && current.map((book, idx) => 
              <>
                <div key={idx} className="bookcard">
                  <Link to={"/Book"} state={{ title: `${book.title}`}}>
                     <img className="shelf-covers" src={book.thumbnail}></img>
                  </Link>
                  <div>
                    <Tooltip title="Finished"><CheckIcon className="list-icons" onClick={() => makeRead(book.title)} /></Tooltip>
                    <Tooltip title="Current"><StarBorderIcon className="list-icons" onClick={() => makeCurrent(book.title)}/></Tooltip>
                    <Tooltip title="To Read"><BookmarkBorderIcon className="list-icons" onClick={() => makeToRead(book.title)}/></Tooltip>
                  </div>
                </div>
              </>
              )}
          </div>
        </div>
        <div className="shelf-backdrop">
          <p className="shelf-title">Past Reads</p>
          <div className="shelf">
              {read && read.map((book, idx) => 
              <>
                <div key={idx} className="bookcard">
                  <Link to={"/Book"} state={{ title: `${book.title}`}}>
                     <img className="shelf-covers" src={book.thumbnail}></img>
                  </Link>
                  <div>
                    <Tooltip title="Finished"><CheckIcon className="list-icons" onClick={() => makeRead(book.title)} /></Tooltip>
                    <Tooltip title="Current"><StarBorderIcon className="list-icons" onClick={() => makeCurrent(book.title)}/></Tooltip>
                    <Tooltip title="To Read"><BookmarkBorderIcon className="list-icons" onClick={() => makeToRead(book.title)}/></Tooltip>
                  </div>
                </div>
              </>
              )}
          </div>
        </div>
    </>
  )
}
export default FriendsBooks