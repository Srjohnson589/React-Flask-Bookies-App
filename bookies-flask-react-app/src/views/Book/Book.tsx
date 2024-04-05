import Nav from '../../components/Nav/Nav.tsx';
import './Book.css'
import { Rating, TextField } from '@mui/material';
import {useLocation} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

interface B {
  title: string;
  author: string;
  thumbnail: string;
  publisher: string;
  published: string;
  googlerating: number;
  description: string;
}

interface Review {
  rating: number;
  text: string;
}

interface AllReviews {
  username: string;
  rating: number;
  text: string;
}

const Book = () => {
    const location = useLocation();
    const {title} = location.state;
    const {user, setUser} = useContext(UserContext);
    const [book, setBook] = useState<B>({title: '',
                                        author: '',
                                        thumbnail: '',
                                        publisher: '',
                                        published: '',
                                        googlerating: 0,
                                        description: ''});
    const [reviewData, setReviewData] = useState<Review>({rating: 0,
                                                          text: ''});
    const [allReviews, setAllReviews] = useState<AllReviews[]>([]);

    useEffect(() => {
      if (user.username === ''){
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          console.log(loggedInUser);
          setUser({...user, 'username': loggedInUser})
        }
      }}, [user]);

    useEffect(() => {
      if (Object.keys(book).length === 0 && book.constructor === Object){
        getBook(title)
      }}, [book, title]);

    useEffect(() => {const timeout = setTimeout(() => {
      if (allReviews.length === 0) {
        getReviews(title);
      }
    }, 3000);
    return () => clearTimeout(timeout); 
  }, [allReviews]);

    const getBook = async (t:string) => {
        const title = t;
        console.log(title);
        const response = await fetch(`https://react-flask-bookies-app.onrender.com/books_api/getBook/${title}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json();
        console.log(data);
        setBook({title: data.title,
                  author: data.author,
                  thumbnail: data.thumbnail,
                  publisher: data.publisher,
                  published: data.published,
                  googlerating: data.googlerating,
                  description: data.description});
      }

    const getReviews = async (t:string) => {
      const title = t;
      console.log(title);
      const response = await fetch(`https://react-flask-bookies-app.onrender.com/reviews_api/get_reviews/${title}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      const data = await response.json();
      console.log(data);
      setAllReviews(data.reviews)
    }

    const postReview = async(r:Review) => {
      const review = r;
      console.log(review);
      const response = await fetch("https://react-flask-bookies-app.onrender.com/reviews_api/add_review", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          rating: reviewData.rating,
          username: localStorage.getItem('user'),
          title: book.title,
          text: reviewData.text
        })
      })
      const data = await response.json();
      console.log(data);
      getReviews(book.title);
      setReviewData({
        rating: 0,
        text: ''
      })
    }

    const handleRatingChange = (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
      // newValue is the rating value provided by the Rating component
      if (newValue) {
        setReviewData({...reviewData, rating: newValue})
      }
    };

  return (
    <>
    <Nav/>
    <div className="book-body">
        {book && 
        <div className="singlebook-container">
          <div className="img-title">
            <img className="mainbook-img" src={book.thumbnail} alt="" />
            <div className="mainbook-info">
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
              <p>{book.publisher} {book.published}</p>
              {(book.googlerating > 0) && <Rating name="half-rating-read" value={book.googlerating} precision={0.5} readOnly />}
              <a href={`https://amazon.com/s?k=${book.title}+${book.author}`} target="_blank" className="amazon-btn">View on <img className="amazon-logo" src="https://cdn.freebiesupply.com/images/large/2x/amazon-logo-transparent.png"></img></a>
              <a href={`https://www.goodreads.com/search?q=${book.title}+${book.author}`} className="amazon-btn">View on <img className="goodreads-logo" src="https://cdn.freebiesupply.com/images/large/2x/goodreads-logo-black-transparent.png" alt="" /></a>
            </div>
          </div>
          {book.description && <p>{book.description}</p>}
        </div>
        }
        <h3 className="friends-review-title">Friends Reviews</h3>
        {allReviews && allReviews.map((review, idx) => 
          <div className="review-card" key={idx}>
            <p>{review.username}</p>
            <Rating name="read-only" value={review.rating} readOnly />
            <p>{review.text}</p>
          </div>
        )}
    </div>
    <div className="review-form">
        <p className="review-header">Write a review!</p>
        <div className="rating-form">
          <Rating
            name="half-rating"
            precision={0.5}
            value={reviewData.rating}
            onChange={handleRatingChange}
          />
        </div>
        <TextField           
            id="outlined-textarea"
            className="review-text"
            label="My comments"
            placeholder="Text here"
            value={reviewData.text}
            onChange={(event) => {setReviewData({...reviewData, text: event.target.value})}}
            multiline />
        <p className="review-btn" onClick={()=>{postReview(reviewData)}}>Submit</p>
    </div>
    </>
  )
}
export default Book