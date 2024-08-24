import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setinputs] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setinputs(perv => ({
            ...perv,
            [e.target.name]: e.target.value
        }));
    }

    const sendRequest = async () => {
        const res = await axios.post('https://authentication-backend-5h12.onrender.com/api/login', {
            email: inputs.email,
            password: inputs.password
        })
            .catch(err => console.log(err));
        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then(() => dispatch(authActions.login()))
            .then(() => history("/user"));
        // send http request 
    }
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <Box
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    width={300}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography variant='h2'>Login</Typography>


                    <TextField
                        name='email'
                        onChange={handleChange}
                        type='email'
                        value={inputs.email}
                        variant='outlined'
                        placeholder='Email'
                        margin='normal'
                    />
                    <TextField
                        name='password'
                        onChange={handleChange}
                        type='password'
                        value={inputs.password}
                        variant='outlined'
                        placeholder='Password'
                        margin='normal'
                    />
                    <Button variant='contained' type='submit'>Login</Button>
                </Box>
            </form>
        </div>
    )

};

export default Login;
