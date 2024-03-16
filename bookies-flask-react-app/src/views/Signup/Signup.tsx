
import './Signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, FormEvent } from 'react';

interface INewuser {
  username: string,
  password: string
}

const Signup = () => {

  const [newuser, setNewuser] = useState<INewuser>({
    username: '',
    password: ''
  })

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
    await createUser()
  }

  return (
    <Form className="signupform" onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter username" 
          onChange={(event) => setNewuser({...newuser, username: event.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        onChange={(event) => setNewuser({...newuser, password: event.target.value})}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
}

export default Signup;