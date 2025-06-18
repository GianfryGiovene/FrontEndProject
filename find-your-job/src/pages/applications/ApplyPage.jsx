import { Box, Paper, Typography, TextField, Button, Avatar, Alert, InputAdornment, IconButton } from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {useState, useEffect, useRef  } from 'react'
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ApplyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const job = location.state?.job || {};
    const user = location.state?.user || {};
    const [form, setForm] = useState({
        name: user.name || "",
        email: user.email || "",
        coverLetter: "",
        curriculum: null,
    });
    const [error, setError] = useState('');
    const [cvName, setCvName] = useState('');
    const inputFileRef = useRef();

    useEffect(() => {
        setForm(f => ({ ...f, name: user.name || "", email: user.email || "" }));
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== "application/pdf") {
            setError('Il curriculum deve essere un file PDF.');
            setForm({ ...form, curriculum: null });
            setCvName('');
            return;
        }
        setForm({ ...form, curriculum: file });
        setCvName(file ? file.name : '');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.coverLetter || !form.email) {
            setError('Insert email and cover letter.');
            return;
        }
        if (!form.curriculum) {
            setError('Upload cv in pdf format');
            return;
        }

        // Verifica doppia candidatura
        const checkApplication = (await axios.get(`${BASE_URL}/applications?userId=${user.id}&jobId=${job.id}`)).data.length > 0;
        if (checkApplication) {
            setError('You have already applied for this offer');
            return;
        }

        const jobOffer = await axios.get(`${BASE_URL}/jobs/${job.id}`);
        await axios.put(`${BASE_URL}/jobs/${job.id}`,
            {
                ...jobOffer.data,
                applications: (jobOffer.data.applications || 0) + 1,
            });

        const application = {
            name: user.name,
            userId: user.id,
            jobId: job.id,
            coverLetter: form.coverLetter,
            curriculum: form.curriculum ? form.curriculum.name : "",
            email: form.email
        };

        const response = await axios.post(`${BASE_URL}/applications`, application);
        if (!response) {
            setError("Errore nell'invio della candidatura.");
            return;
        }
        navigate(`/${user.id}/applications`);
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
                background: 'rgba(255,255,255,0.81)',
                backdropFilter: 'blur(2.5px)'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{
                        m: 1,
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        boxShadow: '0 4px 16px 0 rgba(25,118,210,0.14)'
                    }}>
                        <AssignmentTurnedInIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5" fontWeight={700} color="primary.main" mb={1}>
                        Application: {job.title}
                    </Typography>
                </Box>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Nome"
                        name="name"
                        value={form.name}
                        inputProps={{
                            readOnly: true,
                            style: { backgroundColor: '#f5f5f5', cursor: 'not-allowed' },
                        }}
                        sx={{
                            borderRadius: 2,
                            mb: 1
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
                        sx={{
                            background: '#f8fbff',
                            borderRadius: 2,
                            mb: 1,
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
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        minRows={3}
                        label="Cover Letter"
                        name="coverLetter"
                        value={form.coverLetter}
                        onChange={handleChange}
                        sx={{
                            background: '#f8fbff',
                            borderRadius: 2,
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    boxShadow: '0 2px 10px 0 rgba(25,118,210,0.07)'
                                }
                            }
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Button
                            component="label"
                            variant="outlined"
                            sx={{
                                fontWeight: 700,
                                borderRadius: 40,
                                mr: 2,
                                background: 'rgba(25,118,210,0.04)'
                            }}
                        >
                            {cvName ? 'Cambia CV' : 'Carica CV'}
                            <input
                                ref={inputFileRef}
                                type="file"
                                name="curriculum"
                                accept=".pdf"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        <Typography variant="body2" color={cvName ? 'primary.main' : 'text.secondary'}>
                            {cvName ? cvName : "Solo PDF"}
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
                            boxShadow: '0 4px 16px 0 rgba(25,118,210,0.13)',
                            letterSpacing: 1.2,
                            transition: 'all .18s cubic-bezier(.55,0,.1,1)',
                            '&:hover': {
                                background: 'linear-gradient(90deg,#1976d2 0%, #1a73e8 100%)',
                                boxShadow: '0 8px 40px 0 rgba(25,118,210,0.17)',
                                transform: 'translateY(-2px) scale(1.02)'
                            }
                        }}
                    >
                        Send application
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};


export default ApplyPage;