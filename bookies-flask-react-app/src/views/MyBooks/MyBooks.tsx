import Nav from '../../components/Nav/Nav.tsx'
import './MyBooks.css'
import { UserContext } from '../../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Tooltip } from '@mui/material';

interface MyBook {
  title: string;
  thumbnail: string;
}

const MyBooks = () => {

  const {user, setUser} = useContext(UserContext);
  const [toRead, setToRead] = useState<MyBook[]>([]);
  const [current, setCurrent] = useState<MyBook[]>([]);
  const [read, setRead] = useState<MyBook[]>([]);

  
  useEffect(() => {
    if (Object.keys(user).length === 0 && user.constructor === Object){
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        console.log(loggedInUser);
        setUser({...user, 'username': loggedInUser})
      }
    }}, [user]);
    
  useEffect(() => {getShelves(user.username)}, []);
  
  const getShelves = async (username:string) => {
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/show_shelves', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username})
    })
    const data = await response.json();
    
    setToRead(data.to_read_shelf);
    setCurrent(data.current_shelf);
    setRead(data.read_shelf);
  }

  const removeToRead = async (idx: {idx: number}) => {
    console.log(idx.idx);
    const title = toRead[idx.idx].title;
    console.log(title);
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/remove_to_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const makeCurrent = async (t:string) => {
    const title = t;
    console.log(title);
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/make_current', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const makeRead = async (t:string) => {
    const title = t;
    console.log(title);
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/make_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const makeToRead = async (t:string) => {
    const title = t;
    console.log(title);
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/make_to_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const removeCurrent = async (idx: {idx: number}) => {
    console.log(idx.idx);
    const title = current[idx.idx].title;
    console.log(title);
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/remove_current', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': user.username,
                            'title': title})
    })
    const data = await response.json();
    console.log(data);
    getShelves(user.username);
  }

  const removeRead = async (idx: {idx: number}) => {
    console.log(idx.idx);
    const title = read[idx.idx].title;
    console.log(title);
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/remove_read', {
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
                {toRead && toRead.map((book, idx:number) => 
                <>
                  <div key={idx} className="bookcard">
                    <div className="shelf-covers">
                      <Link to={"/Book"} state={{ title: `${book.title}`}}>
                        <img className="cover" src={book.thumbnail}></img>
                      </Link>
                    </div>
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
                {current && current.map((book, idx:number) => 
                <>
                  <div key={idx} className="bookcard">
                    <div className="shelf-covers">
                      <Link to={"/Book"} state={{ title: `${book.title}`}}>
                        <img className="cover" src={book.thumbnail}></img>
                      </Link>
                    </div>
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
                {read && read.map((book, idx:number) => 
                <>
                  <div key={idx} className="bookcard">
                    <div className="shelf-covers">
                      <Link to={"/Book"} state={{ title: `${book.title}`}}>
                        <img className="cover" src={book.thumbnail}></img>
                      </Link>
                    </div>
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