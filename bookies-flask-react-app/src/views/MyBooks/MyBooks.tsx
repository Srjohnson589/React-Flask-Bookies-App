import Nav from '/src/components/Nav/Nav.tsx'
import './MyBooks.css'
import { UserContext } from '../../context/UserContext';
import { useContext, useEffect, useState } from 'react';

const MyBooks = () => {

  const {user} = useContext(UserContext);
  const [toRead, setToRead] = useState([]);

  useEffect(() => {getToRead(user.username)}, []);

  const getToRead = async (username) => {
    const response = await fetch('http://127.0.0.1:5000/books_api/show_to_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username})
    })
    const data = await response.json()
    console.log(data)
    setToRead(data)
  }

  return (
    <>
        <Nav/>
        <h1>My Books</h1>
        <div className="shelf">
            <h3>To Read</h3>
                       
        </div>
    </>
  )
}
export default MyBooks