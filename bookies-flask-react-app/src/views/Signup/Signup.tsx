import Nav from '/src/components/Nav/Nav.tsx'
import './Signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface INewuser {
  username: string,
  password: string
}

const Signup = () => {

  const [newuser, setNewuser] = useState<INewuser>({
    username: '',
    password: ''
  })

  const navigate = useNavigate();

  const createUser = async () => {
    const response = await fetch('http://127.0.0.1:5000/auth_api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newuser)
    })
    const data = await response.json()
    console.log(data)
  }

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    console.log(newuser);
    await createUser();
    navigate('/');
  }

  return (
    <>
    <Nav/>
    <Form className="signupform" onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="login-label">Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter username" 
          onChange={(event) => setNewuser({...newuser, username: event.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="login-label">Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        onChange={(event) => setNewuser({...newuser, password: event.target.value})}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
      <Link to={"/"} className="text-decoration-none back-btn"><h6 className="back">Back</h6></Link>
    </Form>
    </>
  );
}

export default Signup;