import { useState, useContext } from 'react';
import './FindBooks.css'
import Nav from '/src/components/Nav/Nav.tsx';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn
} from "mdb-react-ui-kit";

const FindBooks = () => {

    const [searchBook, setSearchBook] = useState('');
    const [returnResults, setReturnResults] = useState([]);
    const {user} = useContext(UserContext);


  const searchResults = async (searchStr: string) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchStr}`);
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        setReturnResults([]);
        let i = 0;
        let results = [];
        while (results.length < 5) {
            try{
                let info_dict = {
                    username: user.username,
                    title: data.items[i].volumeInfo.title,
                    thumbnail: data.items[i].volumeInfo.imageLinks.thumbnail,
                    publisher: data.items[i].volumeInfo.publisher,
                    published: data.items[i].volumeInfo.publishedDate.slice(0,4)
                };
                try {
                    info_dict.author = data.items[i].volumeInfo.authors[0];
                } catch {
                    info_dict.author = '';
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
    alert('Book was saved to "to read" shelf')
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
            onChange={(event) => {setSearchBook(event.target.value)}}></input>
            <SearchRoundedIcon onClick={() => {searchResults(searchBook)}} className="srch-icon" />
        </div>
        <div className="booksearch">
        {returnResults && returnResults.map((book, idx) => 
        <MDBCard key={idx} style={{ maxWidth: '540px' }} className="booksearch-results" alignment='center'>
        <MDBRow className='g-0'>
            <MDBCol md='4'>
                <MDBCardImage src={book.thumbnail} alt='...' fluid />
            </MDBCol>
            <MDBCol md='6'>
                <MDBCardBody className="text-start">
                    <MDBCardTitle>{book.title}</MDBCardTitle>
                    <MDBCardText>by {book.author}</MDBCardText>
                    <MDBCardText><small>{book.publisher} {book.published}</small></MDBCardText>
                </MDBCardBody>
            </MDBCol>
            <MDBCol md='2'>
                <Link to={"/MyBooks"} className="text-decoration-none">
                    <MDBBtn onClick={() => {addToRead(idx)}}>Add to read</MDBBtn>
                </Link>
            </MDBCol>
        </MDBRow>
        </MDBCard>
        ) }
        </div>
    </>
  )
}
export default FindBooks;