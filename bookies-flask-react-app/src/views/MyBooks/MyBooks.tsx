import Nav from '/src/components/Nav/Nav.tsx'
import './MyBooks.css'
import { UserContext } from '../../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';


import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Tooltip } from '@mui/material';

const MyBooks = () => {

  const {user, setUser} = useContext(UserContext);
  const [toRead, setToRead] = useState([]);
  const [current, setCurrent] = useState([]);
  const [read, setRead] = useState([]);
  const [alertText, setAlertText] = useState({
    'severity': '',
    'text': ''
  })
  
  useEffect(() => {
    if (Object.keys(user).length === 0 && user.constructor === Object){
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        console.log(loggedInUser);
        setUser({'username': loggedInUser})
      }
    }}, [user]);
    
  useEffect(() => {getShelves(user.username)}, []);
  
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

  const removeToRead = async (idx) => {
    console.log(idx.idx);
    const title = toRead[idx.idx].title;
    console.log(title);
    const response = await fetch('http://127.0.0.1:5000/books_api/remove_to_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const makeCurrent = async (t) => {
    const title = t;
    console.log(title);
    const response = await fetch('http://127.0.0.1:5000/books_api/make_current', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const makeRead = async (t) => {
    const title = t;
    console.log(title);
    const response = await fetch('http://127.0.0.1:5000/books_api/make_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const makeToRead = async (t) => {
    const title = t;
    console.log(title);
    const response = await fetch('http://127.0.0.1:5000/books_api/make_to_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const removeCurrent = async (idx) => {
    console.log(idx.idx);
    const title = current[idx.idx].title;
    console.log(title);
    const response = await fetch('http://127.0.0.1:5000/books_api/remove_current', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const removeRead = async (idx) => {
    console.log(idx.idx);
    const title = read[idx.idx].title;
    console.log(title);
    const response = await fetch('http://127.0.0.1:5000/books_api/remove_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  return (
    <>
        <Nav/>
        <div className="bookshelves-body">
          <h1>Bookshelves</h1>
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
                      <Tooltip title="Finish"><CheckIcon className="list-icons" onClick={() => makeRead(book.title)} /></Tooltip>
                      <Tooltip title="Current"><StarBorderIcon className="list-icons" onClick={() => makeCurrent(book.title)}/></Tooltip>
                      <Tooltip title="Delete"><ClearIcon className="list-icons" onClick={() => removeToRead({idx})} /></Tooltip>
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
                      <Tooltip title="Finish"><CheckIcon className="list-icons" onClick={() => makeRead(book.title)}/></Tooltip>
                      <Tooltip title="To Read"><BookmarkBorderIcon className="list-icons" onClick={() => makeToRead(book.title)}/></Tooltip>
                      <Tooltip title="Delete"><ClearIcon className="list-icons" onClick={() => removeCurrent({idx})} /></Tooltip>
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
                      <Tooltip title="To Read"><BookmarkBorderIcon className="list-icons" onClick={() => makeToRead(book.title)}/></Tooltip>
                      <Tooltip title="Current"><StarBorderIcon className="list-icons" onClick={() => makeCurrent(book.title)} /></Tooltip>
                      <Tooltip title="Delete"><ClearIcon className="list-icons" onClick={() => removeRead({idx})} /></Tooltip>
                    </div>
                  </div>
                </>
                )}
            </div>
          </div>
        </div>
    </>
  )
}
export default MyBooks