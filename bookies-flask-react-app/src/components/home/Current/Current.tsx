
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '/src/context/UserContext.tsx';
import './Current.css'

const Current = () => {

    const [myCurrent, setMyCurrent] = useState([]);
    const { user } = useContext(UserContext);

    const getmyCurrents = async (username) => {
        const response = await fetch('http://127.0.0.1:5000/books_api/show_shelves', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'username': username})
        })
        const data = await response.json();
        console.log(data)
        setMyCurrent(data.current_shelf);
        setsecondwasran(true);
    };

  return (
    <>
        <h4 onClick={()=>{getmyCurrents(user.username)}}>Current Reading</h4>
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
    </>
  )
}
export default Current