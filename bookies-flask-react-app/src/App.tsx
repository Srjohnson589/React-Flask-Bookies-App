import Home from '/src/views/Home/Home.tsx'
import Signup from '/src/views/Signup/Signup.tsx'
import Login from '/src/views/Login/Login.tsx'
import FindBooks from '/src/views/FindBooks/FindBooks.tsx'
import MyBooks from '/src/views/MyBooks/MyBooks.tsx'
import Book from '/src/views/Book/Book.tsx'
import Friends from '/src/views/Friends/Friends.tsx'
import Profile from '/src/views/Profile/Profile.tsx'
import {Route, RouterProvider, Routes} from 'react-router-dom';
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
      </Routes>
    </>
  )
}

export default App;