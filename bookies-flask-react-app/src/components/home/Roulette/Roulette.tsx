// npm install react-multi-carousel --save
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState, useEffect } from 'react';

import './Roulette.css';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  
  const Roulette = () => {
    
    const [topFive, setTopFive]:string[] = useState([]);

    // useEffect(() => {getBestsellers()}, []);

    const getBestsellers = async () => {
      const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${import.meta.env.VITE_NYT_KEY}`);
      if (response.ok) {
          const data = await response.json();
          let i = 0;
          let results:string[] = [];
          while (results.length < 5) {
              try{
                  results.push(data.results.books[i].book_image);
                  i++;
              } catch {
                  i++;
              }
          }
          setTopFive(results);
          console.log(topFive);
      } else {
          console.log('error');
      }
    };
    
    return (
    <div className="roulette-container">
        <h2>This week's NYT Bestsellers</h2>
        <Carousel responsive={responsive}>
        {topFive && topFive.map((book, idx) => {
          <div className="carousel-img"><img src={book} alt="{idx}" /></div>
  })}
        </Carousel>
    </div>
  );
    }
  export default Roulette;