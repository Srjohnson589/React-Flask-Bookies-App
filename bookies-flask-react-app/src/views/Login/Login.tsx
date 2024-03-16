
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, FormEvent, useContext } from 'react';
// import { UserContext } from '../../context/UserContext';

interface ILoginuser {
  username: string,
  password: string
}

const Login = () => {

  // const {setUser} = useContext(UserContext)

  const [loginuser, setLoginuser] = useState<ILoginuser>({
    username: '',
    password: ''
  })

  const signinUser = async () => {
    const response = await fetch('http://127.0.0.1:5000/auth_api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginuser)
    })
    const data = await response.json()
    console.log(data)
    // if (data.status === 'ok') {
    //   setUser({username: loginuser.username})
    //   console.log(`${loginuser.username} is logged in`)
    // }
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    console.log(loginuser);
    await signinUser();
  }

  return (
    <Form className="loginform" onSubmit={handleLogin}>
      <h2>Login</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter username" 
          onChange={(event) => setLoginuser({...loginuser, username: event.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        onChange={(event) => setLoginuser({...loginuser, password: event.target.value})}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default Login;