import { useState, useContext, useEffect } from 'react';
import './FindBooks.css'
import Nav from '../../components/Nav/Nav.tsx';
import { UserContext } from '../../context/UserContext';
import Alert from '@mui/material/Alert';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CheckIcon from '@mui/icons-material/Check';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCardImage,MDBRow,MDBCol} from "mdb-react-ui-kit";
import { Rating } from '@mui/material';

interface NewBook {
  username: string;
  title: string;
  author: string;
  thumbnail: string;
  publisher: string;
  published: string;
  googlerating: number;
  description: string;
}

interface Alert {
  severity: 'error' | 'info' | 'success' | 'warning';
  text: string;
}

const FindBooks = () => {

    const [searchBook, setSearchBook] = useState('');
    const [returnResults, setReturnResults] = useState<NewBook[]>([]);
    const {user, setUser} = useContext(UserContext);
    const [alertText, setAlertText] = useState({
      'severity': 'success',
      'text': ''
    })

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          console.log(loggedInUser);
          setUser({...user, 'username': loggedInUser})
        }
      }, []);

  const searchResults = async (searchStr: string) => {
    setAlertText({
      'severity': '',
      'text': ''
    })
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchStr}`);
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        setReturnResults([]);
        let i = 0;
        let results:NewBook[] = [];
        while (data.items[i]) {
            try{
                let info_dict:NewBook = {
                    username: user.username,
                    title: data.items[i].volumeInfo.title,
                    thumbnail: data.items[i].volumeInfo.imageLinks.thumbnail,
                    description: data.items[i].volumeInfo.description,
                    published: data.items[i].volumeInfo.publishedDate.slice(0,4),
                    author: '',
                    publisher: '',
                    googlerating: 0
                };
                try {
                    info_dict.author = data.items[i].volumeInfo.authors[0];
                } catch {
                    info_dict.author = '';
                }
                try {
                    info_dict.publisher = data.items[i].volumeInfo.publisher;
                } catch {
                    info_dict.publisher = '';
                }
                try {
                  info_dict.googlerating = data.items[i].volumeInfo.averageRating;
              } catch {
                  info_dict.googlerating = 0;
              }
                results.push(info_dict);
                i++;
            } catch {
                i++;
            }
        }
        console.log(results)
        setReturnResults(results);
    } else {
        console.log('error');
    }
  };

  const addToRead = async (index: number) => {
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/add_to_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(returnResults[index])
    })
    const data = await response.json()
    if (data.status === 'ok'){
      setAlertText({
        'severity': 'success',
        'text': 'Book was added to your "To Read" Shelf.'
      })
    } else {
        setAlertText({
          'severity': 'error',
          'text': 'Something went wrong and book was not saved'
        })
    }
    }

  const addCurrent = async (index: number) => {
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/add_current', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(returnResults[index])
    })
    const data = await response.json()
    console.log(data)
    if (data.status === 'ok'){
      setAlertText({
        'severity': 'success',
        'text': 'Book was added to your "Current" Shelf.'
      })
    } else {
        setAlertText({
          'severity': 'error',
          'text': 'Something went wrong and book was not saved'
        })
    }
  }

  const addRead = async (index: number) => {
    const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/add_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(returnResults[index])
    })
    const data = await response.json()
    console.log(data)
    if (data.status === 'ok'){
      setAlertText({
        'severity': 'success',
        'text': 'Book was added to your "Read" Shelf.'
      })
    } else {
        setAlertText({
          'severity': 'error',
          'text': 'Something went wrong and book was not saved'
        })
    }
  }

  return (
    <>
        <Nav/>
        {alertText && <Alert id={alertText.severity} sx={{ severity: `${alertText.severity}` }}>{alertText.text}
        </Alert>}
        <div className="book-searchbar">
            <input 
            type="text" 
            id="findbook-input"
            className="form-control form-rounded" 
            placeholder="Title or Author"
            onKeyDown={(e) => {if(e.key === 'Enter'){searchResults(searchBook)}}}
            onChange={(event) => {setSearchBook(event.target.value)}}></input>
            <SearchRoundedIcon onClick={() => {searchResults(searchBook)}} className="srch-icon" />
        </div>
        <div className="booksearch">
        {returnResults && returnResults.map((book, idx) => 
        <MDBCard key={idx} id="booksearch-results" alignment='center'>
        <MDBRow className='g-0'>
            <MDBCol md='4'>
                <MDBCardImage className="book-img" src={book.thumbnail} alt='...' fluid />
            </MDBCol>
            <MDBCol md='6'>
                <MDBCardBody className="text-start">
                    <MDBCardTitle className="book-title">{book.title}</MDBCardTitle>
                    <MDBCardText className="book-author">by {book.author}</MDBCardText>
                    <MDBCardText className="book-publishing">{book.publisher} {book.published}</MDBCardText>
                    {book.googlerating && <Rating name="half-rating-read" value={book.googlerating} precision={0.5} readOnly />}
                </MDBCardBody>
            </MDBCol>
            <MDBCol md='2'>
                <div id="add-btn" onClick={() => {addToRead(idx)}}><BookmarkBorderIcon className="btn-icon"/><p>To read</p></div>
                <div id="read-btn" onClick={() => {addRead(idx)}}><CheckIcon className="btn-icon"/><p>Read</p></div>
                <div id="current-btn" onClick={() => {addCurrent(idx)}}><StarBorderIcon className="btn-icon"/><p>Current</p></div>
            </MDBCol>
        </MDBRow>
        </MDBCard>
        ) }
        </div>
    </>
  )
}
export default FindBooks;