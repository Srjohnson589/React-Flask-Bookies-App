import Home from './views/Home/Home.tsx'
import Signup from './views/Signup/Signup.tsx'
import Login from './views/Login/Login.tsx'
import FindBooks from './views/FindBooks/FindBooks.tsx'
import MyBooks from './views/MyBooks/MyBooks.tsx'
import Book from './views/Book/Book.tsx'
import Friends from './views/Friends/Friends.tsx'
import Profile from './views/Profile/Profile.tsx'
import FriendsBooks from './views/FriendsBooks/FriendsBooks.tsx'
import {Route, Routes} from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/findbooks" element={<FindBooks/>}/>
        <Route path="/mybooks" element={<MyBooks/>}/>
        <Route path="/Book" element={<Book/>}/>
        <Route path="/Friends" element={<Friends/>}/>
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/FriendsBooks" element={<FriendsBooks/>} />
      </Routes>
    </>
  )
}

export default App;