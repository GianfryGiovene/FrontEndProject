import { useNavigate } from "react-router";
import { useState } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, TextField, Button, Switch, Avatar, Alert } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const isEmailValid = (email) => /^\S+@\S+\.\S+$/.test(email);
const isUsernameValid = (username) => /^[a-zA-Z0-9]{3,}$/.test(username);
const isPasswordValid = (password) => password.length >= 6;

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({username: '', email: '', password: '', role:'user'});
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [role, setRole] = useState(false);

    const validateField = (name, value) => {
        switch(name) {
            case 'username':
                if (!isUsernameValid(value)) return "Username of at least 3 characters without spaces.";
                break;
            case 'email':
                if (!isEmailValid(value)) return "Email not valid.";
                break;
            case 'password':
                if (!isPasswordValid(value)) return "Password of at least 6 characters.";
                break;
            default: return null;
        }
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setError('');
        setFieldErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    const handleRoleChange = (event) => {
        setRole(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errs = {};
        if (!isUsernameValid(form.username)) errs.username = "Username of at least 3 characters without spaces.";
        if (!isEmailValid(form.email)) errs.email = "Email not valid.";
        if (!isPasswordValid(form.password)) errs.password = "Password of at least 6 characters.";

        setFieldErrors(errs);

        if (Object.keys(errs).length) return;

        const userData = {
            username: form.username,
            password: form.password,
            email: form.email,
            role: role ? 'admin' : 'user'
        };

        const res = await axios.get(`${BASE_URL}/users?username=${userData.username}`);
        if(res.data.length > 0){
            setError('Username already used');
            return;
        }
        const response = await axios.post(`${BASE_URL}/users`, userData)
        if(!response){
            setError("Error while registration");
            return;
        }
        navigate('/login');
      };
      
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(120deg, #e3f0ff 0%, #f4fafe 80%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Paper elevation={0} sx={{
                p: { xs: 3, md: 4 },
                maxWidth: 380,
                width: '100%',
                borderRadius: 6,
                boxShadow: '0 6px 36px 0 rgba(21,78,220,0.07)',
                background: 'rgba(255,255,255,0.77)',
                backdropFilter: 'blur(2.5px)'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{
                        m: 1,
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        boxShadow: '0 4px 16px 0 rgba(25,118,210,0.12)'
                    }}>
                        <PersonAddAlt1Icon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5" fontWeight={700} color="primary.main" mb={1}>
                        Registrati a FindYourJob
                    </Typography>
                </Box>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoFocus
                        value={form.username}
                        onChange={handleChange}
                        error={Boolean(fieldErrors.username)}
                        helperText={fieldErrors.username || ''}
                        sx={{
                            background: '#f8fbff',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    boxShadow: '0 2px 10px 0 rgba(25,118,210,0.08)'
                                }
                            }
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={Boolean(fieldErrors.email)}
                        helperText={fieldErrors.email || ''}
                        sx={{
                            background: '#f8fbff',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    boxShadow: '0 2px 10px 0 rgba(25,118,210,0.08)'
                                }
                            }
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        error={Boolean(fieldErrors.password)}
                        helperText={fieldErrors.password || ''}
                        sx={{
                            background: '#f8fbff',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    boxShadow: '0 2px 10px 0 rgba(25,118,210,0.08)'
                                }
                            }
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
                        <Switch
                            checked={role}
                            onChange={handleRoleChange}
                            inputProps={{ 'aria-label': 'admin role' }}
                            sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Are you a recruiter?
                        </Typography>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 2, mb: 1, fontWeight: 700, borderRadius: 40, py: 1.2, fontSize: 18,
                            background: 'linear-gradient(90deg,#1a73e8 0%, #1976d2 100%)',
                            boxShadow: '0 4px 16px 0 rgba(25,118,210,0.11)',
                            letterSpacing: 1.2,
                            transition: 'all .18s cubic-bezier(.55,0,.1,1)',
                            '&:hover': {
                                background: 'linear-gradient(90deg,#1976d2 0%, #1a73e8 100%)',
                                boxShadow: '0 8px 40px 0 rgba(25,118,210,0.17)',
                                transform: 'translateY(-2px) scale(1.02)'
                            }
                        }}
                    >
                        Register
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        size="large"
                        sx={{
                            mt: 1, fontWeight: 700, borderRadius: 40, fontSize: 16, color: '#1976d2',
                            letterSpacing: 1.2, textDecoration: 'underline',
                            '&:hover': {
                                background: 'rgba(25,118,210,0.06)',
                                color: '#14459a',
                                textDecoration: 'underline'
                            }
                        }}
                        onClick={() => navigate('/login')}
                    >
                        Have you already an account? Sign In
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default RegisterPage;
