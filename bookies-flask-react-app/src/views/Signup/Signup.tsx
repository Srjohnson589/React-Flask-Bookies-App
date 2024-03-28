import Nav from '/src/components/Nav/Nav.tsx'
import './Signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

interface INewuser {
  username: string,
  password: string
}

const Signup = () => {

  const [newuser, setNewuser] = useState<INewuser>({
    username: '',
    password: ''
  })

  const [alertText, setAlertText] = useState({
    'severity': '',
    'text': ''
  })

  const navigate = useNavigate();

  const createUser = async () => {
    const response = await fetch('http://127.0.0.1:5000/auth_api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newuser)
    })
    const data = await response.json()
    if (data.status === 'ok'){
        setAlertText({
          'severity': 'success',
          'text': 'New account was created.'
        })
    } else {
        setAlertText({
          'severity': 'error',
          'text': 'That username already exists.'
        })
    }
  }

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    console.log(newuser);
    if ((newuser['username'].trim()).length === 0){
      setAlertText({
        'severity': 'error',
        'text': 'Please enter a username'
      })
    } else {
      await createUser();
    }
  }

  return (
    <>
    <Nav/>
    {alertText && <Alert id={alertText.severity} severity={alertText.severity}>{alertText.text}
    </Alert>}
    <Form className="signupform" onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="login-label">Username</Form.Label>
        <Form.Control 
          type="text"
          className="signup-input"
          placeholder="Enter username" 
          onChange={(event) => setNewuser({...newuser, username: event.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="login-label">Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        className="signup-input"
        onChange={(event) => setNewuser({...newuser, password: event.target.value})}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Create my account
      </Button>
      <Link to={"/"} className="text-decoration-none back-btn"><h6 className="back">Go Home</h6></Link>
    </Form>
    </>
  );
}

export default Signup;