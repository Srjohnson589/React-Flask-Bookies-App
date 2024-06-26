import Nav from '../../components/Nav/Nav.tsx'
import './Signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

interface INewuser {
  username: string,
  password: string
}

interface IAlert {
  severity: 'error' | 'info' | 'success' | 'warning' | undefined;
  text: string;
}

const Signup = () => {

  const [newuser, setNewuser] = useState<INewuser>({
    username: '',
    password: ''
  })
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState<IAlert>({
    severity: undefined,
    text: ''
  })

  const createUser = async () => {
    const response = await fetch('https://react-flask-bookies-app.onrender.com/auth_api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newuser)
    })
    const data = await response.json()
    if (data.status === 'ok'){
        setShowAlert(true);
        setAlertText({
          'severity': 'success',
          'text': 'New account was created.'
        })
    } else {
        setShowAlert(true);
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
      setShowAlert(true);
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
    {showAlert && <Alert id={alertText.severity} sx={{ severity: `${alertText.severity}` }}>{alertText.text}
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