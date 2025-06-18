import axios from 'axios';
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import ApplicationCard from '../../components/ApplicationCard';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
     const userLogged = useSelector(state => state.auth.user);

    useEffect(() => {
        const getApplications = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/applications?userId=${userLogged.id}`);
                setApplications(response.data || []);
            } catch (error) {
                console.error("Errore nel caricamento delle applications:", error);
            }
        }
        getApplications();
    }, [userLogged.id]);


    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(120deg, #e3f0ff 0%, #f4fafe 100%)',
                px: { xs: 2, md: 6 },
                py: { xs: 2, md: 5 }
            }}
        >
            <Typography
                variant="h3"
                fontWeight={800}
                color="primary.main"
                sx={{ mb: 4, textAlign: 'center', letterSpacing: -1 }}
            >
                Your applyes
            </Typography>
            <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                justifyContent="center"
            >
                {applications.length > 0 ? (
                    applications.map(application => (
                        <ApplicationCard key={application.id} application={application} />
                    ))
                ) : (
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ textAlign: 'center', mt: 8 }}
                    >
                        There are no applyes
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default ApplicationsPage;