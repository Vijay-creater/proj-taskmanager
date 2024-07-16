import * as React from 'react';
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

function Login() {
    const { apiUrl } = config

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            userName: data.get('userName'),
            password: data.get('password'),
        });
        loginApi(data.get('userName'), data.get('password'))
    };

    const loginApi = async (userName, password) => {
        try {
            const apiUrl = "http://localhost:3001/"; // Ensure this is set to your actual API URL

            // Log API URL
            // console.log(`API URL: ${apiUrl}`);
    
            // Log the API URL to verify it's correct
            console.log(`API URL: ${apiUrl}`);
            const requestBody = {
                user_name: userName,
                password: password
            };
    
            var response = await fetch('http://localhost:3001/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            const data = await response.json();
            if (response.status === 200) {
                // Assuming the response contains a token and user details
                sessionStorage.setItem('token', data.Token);
                sessionStorage.setItem('userId', data.user_id);
                sessionStorage.setItem('userName', data.user_name);
                window.location.href = '/task'; // Redirect to task page upon successful login
            } else {
                if ('message' in data) {
                    const message = data.message;
                    if (Array.isArray(message)) {
                        alert(message[0]);
                    } else {
                        alert(message);
                    }
                } else {
                    alert('Something went wrong');
                }
            }
        } catch (error) {
            console.log(error)
            console.error('Error during login:', error);
            alert('Network error or server issue. Please try again later.');
        }
    };
    

    // const loginApi = async (userName, password) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('user_name', userName);
    //         formData.append('password', password);

    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             body: formData
    //         });
    //         const data = await response.json();
    //         if (response.status === 200) {
    //             // sessionStorage.setItem('token', data.Token);
    //             // sessionStorage.setItem('userId', data.user_id);
    //             // sessionStorage.setItem('userName', data.user_name);
    //             window.location.href = '/task';
    //         } else {
    //             if ('message' in data) {
    //                 const message = data.message
    //                 if (typeof message === 'object' && message !== null && Array.isArray(message)) {
    //                     alert(message[0])
    //                 } else {
    //                     alert(message)
    //                 }
    //             } else {
    //                 alert('SomeThing Went Wrong')
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error fetching task statuses:', error);
    //     }
    // }

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
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="userName"
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        autoFocus
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
                                Login
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link component={RouterLink} to="/register" variant="body2">
                                        Create an account
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login