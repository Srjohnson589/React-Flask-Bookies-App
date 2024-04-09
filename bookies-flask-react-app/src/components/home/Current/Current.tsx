
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext.tsx';
import './Current.css'

interface B {
  title: string;
  author: string;
  thumbnail: string;
}

const Current = () => {

    const [myCurrent, setMyCurrent] = useState<B[]>([]);
    const { user } = useContext(UserContext);
    const [currentran, setCurrentran] = useState(false);

    useEffect(() => {
      if (currentran == false){
        getmyCurrents(user.username)
      }}, [currentran]);

    const getmyCurrents = async (username:string) => {
        const response = await fetch('https://react-flask-bookies-app.onrender.com/books_api/show_shelves', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'username': username})
        })
        const data = await response.json();
        console.log("********************************* line 31")
        console.log(data)
        const currentShelf: B[] = data.current_shelf;
        for (let item of currentShelf) {
          setMyCurrent([...myCurrent, item]);
        }
        setCurrentran(true);
    };

  return (
    <>
        <div className="current-body">
          <h4 className="currentreading">Current Reading</h4>
          <div className="current-container">
              {myCurrent ? myCurrent.map((item, idx) => 
              <div className="current-book" key={idx}>
                  <img src={item.thumbnail} alt="" />
                  <p className="title">{item.title}</p>
                  <p className="author">{item.author}</p>
              </div>):
              <div>
                  <img src="https://static7.depositphotos.com/1150740/680/v/950/depositphotos_6807974-stock-illustration-cartoon-vacation-outfit-man-with.jpg" alt="" />
                  <p>Nothing right now!</p>
              </div>}          
          </div>
        </div>
    </>
  )
}
export default Current