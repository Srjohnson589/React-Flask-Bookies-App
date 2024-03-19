import Home from '/src/views/Home/Home.tsx'
import Signup from '/src/views/Signup/Signup.tsx'
import Login from '/src/views/Login/Login.tsx'
import FindBooks from '/src/views/FindBooks/FindBooks.tsx'
import MyBooks from '/src/views/MyBooks/MyBooks.tsx'
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
      </Routes>
    </>
  )
}

export default App;