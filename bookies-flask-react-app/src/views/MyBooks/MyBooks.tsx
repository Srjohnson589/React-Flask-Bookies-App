import Nav from '/src/components/Nav/Nav.tsx'
import './MyBooks.css'
import { UserContext } from '../../context/UserContext';
import { useContext, useEffect, useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const MyBooks = () => {

  const {user, setUser} = useContext(UserContext);
  const [toRead, setToRead] = useState([]);
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log(loggedInUser);
      setUser({'username': loggedInUser})
    }
  }, []);
  
  useEffect(() => {getToRead(user.username)}, []);
  
  const getToRead = async (username) => {
    const response = await fetch('http://127.0.0.1:5000/books_api/show_to_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username})
    })
    const data = await response.json();
    setToRead(data.to_read_shelf);
  }

  const handleRemove = async (idx) => {
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
    getToRead(user.username);
  }

  return (
    <>
      <div className="shelf-container">
        <Nav/>
        <h1 className="shelf-h">Shelves</h1>
            <h3>To Read</h3>
        <div className="shelf">
            {toRead && toRead.map((book, idx) => 
            <>
              <div key={idx} className="bookcard">
                <p className="title">{book.title}</p>
                <img src={book.thumbnail}></img>
                <p className="author">{book.author}</p>
                <div>
                  <CheckCircleOutlineIcon className="list-icons" />
                  <StarBorderIcon className="list-icons" />
                  <ClearIcon className="list-icons" onClick={() => handleRemove({idx})} />
                </div>
              </div>
            </>
            )}
        </div>
        </div>
    </>
  )
}
export default MyBooks