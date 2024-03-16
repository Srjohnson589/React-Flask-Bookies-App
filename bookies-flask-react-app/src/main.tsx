import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider, { UserContext } from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <UserContextProvider>
        <App />
    </UserContextProvider>
    </BrowserRouter>
)
