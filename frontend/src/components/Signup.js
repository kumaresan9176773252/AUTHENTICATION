import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Box } from '@mui/material';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const history = useNavigate();
    const [inputs, setinputs] = useState({
        name: '',
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
        const res = await axios.post('https://authentication-backend-5h12.onrender.com/api/signup', {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/login"));
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
                    <Typography variant='h2'>Signup</Typography>

                    <TextField
                        name='name'
                        onChange={handleChange}
                        value={inputs.name}
                        variant='outlined'
                        placeholder='Name'
                        margin='normal'
                    />
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
                    <Button variant='contained' type='submit'>Signup</Button>
                </Box>
            </form>
        </div>
    )
};

export default Signup;
