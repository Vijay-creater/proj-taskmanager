import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import config from './../../config'

const defaultTheme = createTheme();

function Register() {
   const {apiUrl} = config

    // email validation ------------------------------------------
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(newEmail) ? '' : 'Invalid email address');//terinary operator
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            userName: data.get('userName'),
            displayName: data.get('displayName'),
        });
        if (emailError === ''){
            registerApi(data.get('userName'), data.get('password'),data.get('email'),data.get('displayName'))
        } 
    };

    const registerApi = async (userName, password,email,displayName) => {
        try {
            const formData = new FormData();
            formData.append('user_name', userName); 
            formData.append('password', password); 
            formData.append('email', email); 
            formData.append('display_name', displayName); 

            const response = await fetch(`${apiUrl}register/`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.status === 200) {
                window.location.href = '/task';
                sessionStorage.setItem('token', data.Token);
                sessionStorage.setItem('userId', data.user_id);
                sessionStorage.setItem('userName', data.user_name);
            } else {
                console.log(data)
                if ('message' in data) {
                    const message = data.message
                    if (typeof message === 'object' && message !== null && Array.isArray(message)) {
                        alert(message[0])
                    } else {
                        alert(message)
                    }
                } else if ('user_name' in data) {
                    const userName = data.user_name
                    if (typeof userName === 'object' && userName !== null && Array.isArray(userName)) {
                        alert(userName[0])
                    } else {
                        alert(userName)
                    }
                } 
                else {
                    alert('SomeThing Went Wrong')
                }
            }
        } catch (error) {
            console.error('Error fetching task statuses:', error.message);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box  sx={{ mt: 3 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        name="userName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="displayName"
                                        required
                                        fullWidth
                                        id="displayName"
                                        label="Display Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>

                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        error={Boolean(emailError)}
                                        helperText={emailError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link component={RouterLink} to="/" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}

export default Register