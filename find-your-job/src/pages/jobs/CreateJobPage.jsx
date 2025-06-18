import { Box, Button, Paper, TextField, Typography, MenuItem, Alert, Avatar } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const categories = [
  "IT",
  "Administrative",
  "Marketing",
  "Logistic",
  "Production",
  "Others"
];

const CreateJobPage =  () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const userId = useSelector(state => state.auth.user.id);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.description || !form.category) {
          setError('All fields are required.');
          return;
        }

        const jobOffer = {
            userId: userId,
            title: form.title,
            description: form.description,
            category: form.category,
            applications: 0
        }

        setError('');        
        const response = await axios.post(`${BASE_URL}/jobs`, jobOffer)

        if(!response){
            setError("Errore while save the job offer");
            return;
        }
        navigate(-1);
    };
    return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #e3f0ff 0%, #f4fafe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          maxWidth: 460,
          width: '100%',
          borderRadius: 6,
          boxShadow: '0 6px 36px 0 rgba(21,78,220,0.09)',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(2.5px)'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{
            m: 1,
            bgcolor: 'primary.main',
            width: 56,
            height: 56,
            boxShadow: '0 4px 16px 0 rgba(25,118,210,0.12)'
          }}>
            <WorkOutlineIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight={700} color="primary.main" mb={1}>
            New job offer
          </Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Titolo"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{
              background: '#f8fbff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 10px 0 rgba(25,118,210,0.07)'
                }
              }
            }}
          />
          <TextField
            label="Descrizione"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            minRows={3}
            sx={{
              background: '#f8fbff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 10px 0 rgba(25,118,210,0.07)'
                }
              }
            }}
          />
          <TextField
            select
            label="Categoria"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{
              background: '#f8fbff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 10px 0 rgba(25,118,210,0.07)'
                }
              }
            }}
          >
            <MenuItem value="">Select one category</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              fontWeight: 700,
              borderRadius: 40,
              py: 1.2,
              fontSize: 18,
              background: 'linear-gradient(90deg,#1a73e8 0%, #1976d2 100%)',
              boxShadow: '0 4px 16px 0 rgba(25,118,210,0.11)',
              letterSpacing: 1.2,
              transition: 'all .18s cubic-bezier(.55,0,.1,1)',
              '&:hover': {
                background: 'linear-gradient(90deg,#1976d2 0%, #1a73e8 100%)',
                boxShadow: '0 8px 40px 0 rgba(25,118,210,0.16)',
                transform: 'translateY(-2px) scale(1.01)'
              }
            }}
          >
            Create job offer
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default CreateJobPage;