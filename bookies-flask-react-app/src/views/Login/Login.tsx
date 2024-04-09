import Nav from '../../components/Nav/Nav.tsx'
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, FormEvent, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

interface ILoginuser {
  username: string,
  password: string
}

const Login = () => {

  const {user, setUser} = useContext(UserContext)

  const [loginuser, setLoginuser] = useState<ILoginuser>({
    username: '',
    password: ''
  })

  const [alertText, setAlertText] = useState({
    'severity': '',
    'text': ''
  })

  const navigate = useNavigate()

  const signinUser = async () => {
    const response = await fetch('https://react-flask-bookies-app.onrender.com/auth_api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginuser)
    })
    const data = await response.json()
    console.log(data)
    if (data.status === 'ok') {
      setUser({...user, username: loginuser.username});
      localStorage.setItem('user', loginuser.username);
      console.log(localStorage.getItem('user'));
      navigate('/');
    } else {
      setAlertText({
        'severity': 'error',
        'text': 'Username or password are incorrect'
      })}
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    await signinUser();
  }

  return (
    <>
    <Nav/>
    {alertText && <Alert id={alertText.severity} sx={{ severity: `${alertText.severity}` }}>{alertText.text}
    </Alert>}
    <Form className="loginform" onSubmit={handleLogin}>
      <h2>Login</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="login-label">Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter username" 
          onChange={(event) => setLoginuser({...loginuser, username: event.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="login-label">Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        onChange={(event) => setLoginuser({...loginuser, password: event.target.value})}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Link to={"/"} className="text-decoration-none back-btn"><h6 className="back">Go Home</h6></Link>
    </Form>
    </>
  );
}

export default Login;