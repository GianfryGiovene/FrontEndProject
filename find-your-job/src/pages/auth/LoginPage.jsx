import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import { setIsLoggedIn } from '../../store/actions/authActions';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Insert username and password');
      return;
    }
    
    const userData = {
            username: form.username,
            password: form.password
        }

    const found = await axios.get(`${BASE_URL}/users?username=${userData.username}&password=${userData.password}`);
    
    if (!found) {
      setError('Invalid Credentials.');
      return;
    }

    if(found.data.length <= 0){
        setError('Invalid Credentials.');
        return 
    }
    
    dispatch(setIsLoggedIn(found.data[0]));
    navigate("/")
    
  };

  const goToRegisterPage = () => {
    navigate("/register");
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f4fafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 350 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login FindYourJob
          </Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={e => handleSubmit(e)}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            value={form.username}
            onChange={handleChange}
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1, fontWeight: 600 }}
          >
            Login
          </Button>
        </Box>
        <Box
        sx={{display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center'}}>
          <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
            Or register 
          </Typography>
          <Button
            type="submit"            
            variant="contained"
            sx={{ mt: 2, mb: 1, fontWeight: 600,  }}
            onClick={() => goToRegisterPage()}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;