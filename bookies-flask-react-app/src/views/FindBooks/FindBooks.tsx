import { useState, useContext, useEffect } from 'react';
import './FindBooks.css'
import Nav from '/src/components/Nav/Nav.tsx';
import { UserContext } from '../../context/UserContext';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CheckIcon from '@mui/icons-material/Check';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCardImage,MDBRow,MDBCol} from "mdb-react-ui-kit";

const FindBooks = () => {

    const [searchBook, setSearchBook] = useState('');
    const [returnResults, setReturnResults] = useState([]);
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          console.log(loggedInUser);
          setUser({'username': loggedInUser})
        }
      }, []);

  const searchResults = async (searchStr: string) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchStr}`);
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        setReturnResults([]);
        let i = 0;
        let results = [];
        while (data.items[i]) {
            try{
                let info_dict = {
                    username: user.username,
                    title: data.items[i].volumeInfo.title,
                    thumbnail: data.items[i].volumeInfo.imageLinks.thumbnail,
                    published: data.items[i].volumeInfo.publishedDate.slice(0,4)
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
    const response = await fetch('http://127.0.0.1:5000/books_api/add_to_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(returnResults[index])
    })
    const data = await response.json()
    console.log(data)
    alert('Book was saved to "to read" shelf')
  }

  const addCurrent = async (index: number) => {
    const response = await fetch('http://127.0.0.1:5000/books_api/add_current', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(returnResults[index])
    })
    const data = await response.json()
    console.log(data)
    alert('Book was saved to "current" shelf')
  }

  const addRead = async (index: number) => {
    const response = await fetch('http://127.0.0.1:5000/books_api/add_read', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(returnResults[index])
    })
    const data = await response.json()
    console.log(data)
    alert('Book was saved to "read" shelf')
  }

  return (
    <>
        <Nav/>
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
        <MDBCard key={idx} style={{ maxWidth: '650px' }} id="booksearch-results" alignment='center'>
        <MDBRow className='g-0'>
            <MDBCol md='4'>
                <MDBCardImage className="book-img" src={book.thumbnail} alt='...' fluid />
            </MDBCol>
            <MDBCol md='6'>
                <MDBCardBody className="text-start">
                    <MDBCardTitle>{book.title}</MDBCardTitle>
                    <MDBCardText>by {book.author}</MDBCardText>
                    <MDBCardText><small>{book.publisher} {book.published}</small></MDBCardText>
                </MDBCardBody>
            </MDBCol>
            <MDBCol md='2'>
                <div id="add-btn" onClick={() => {addToRead(idx)}}><BookmarkBorderIcon className="btn-icon"/>To read</div>
                <div id="read-btn" onClick={() => {addRead(idx)}}><CheckIcon className="btn-icon"/>Read</div>
                <div id="current-btn" onClick={() => {addCurrent(idx)}}><StarBorderIcon className="btn-icon"/>Current</div>
            </MDBCol>
        </MDBRow>
        </MDBCard>
        ) }
        </div>
    </>
  )
}
export default FindBooks;