import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css';
import { useState } from 'react';
import { auth } from "/src/views/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface IProps {
    openL: boolean,
    handleCloseL: () => boolean;
}

function Login({openL, handleCloseL}:IProps) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  // UserLogin
  const [logininput, setLogininput] = useState({
    email: "",
    password: ""
  })

const handleSubmit = () => {
  signInWithEmailAndPassword(auth, logininput.email, logininput.password)
    .then((userCredential) => {
      // Logged in
      const user = userCredential.user;
      alert('Logged in')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
};


  return (
      <Modal
        open={openL}
        onClose={handleCloseL}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="loginform">
            <h2>Login</h2>
            <TextField
            id="outlined-helperText"
            label="Email"
            onChange={(event)=> setLogininput({...logininput, email: event.target.value})}
                />
            <br></br>
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event)=> setLogininput({...logininput, password: event.target.value})}
            />
            <Button onClick={() => {handleSubmit(); handleCloseL()}} variant="contained">Login</Button>
            
        </Box>
      </Modal>
  );
}

export default Login