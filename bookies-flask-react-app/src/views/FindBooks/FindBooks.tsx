import { useState } from 'react';
import './FindBooks.css'
import Nav from '/src/components/Nav/Nav.tsx';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

interface IBook {
    id : string,
    title: string,
    author: string,
    smallThumbnail: string,
    thumbnail: string
}

interface IBookList {
    [index: number]:IBook;
}

const FindBooks = () => {

    const [searchBook, setSearchBook] = useState('');
  
    const [book, setBook] = useState<IBook>({
        id: '',
        title: '',
        author: '',
        smallThumbnail: '',
        thumbnail: ''
    });
    
    const [returnResults, setReturnResults] = useState<IBookList>([]);


  const searchResults = async (searchStr: string) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchStr}`);
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        setReturnResults([]);
        let i = 0;
        let books = [];
        while (i < 9) {
            try{
                setBook({
                    id: data.items[i].id,
                    title: data.items[i].volumeInfo.title,
                    author: data.items[i].volumeInfo.authors[0],
                    smallThumbnail: data.items[i].volumeInfo.imageLinks.smallThumbnail,
                    thumbnail: data.items[i].volumeInfo.imageLinks.thumbnail
                });
                console.log(i);
                setReturnResults(returnResults => [...returnResults, book]);
                i++;
            } catch {
                i++;
            }
        }
        console.log(returnResults)
    } else {
        console.log('error');
    }
  };

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

    </>
  )
}
export default FindBooks;