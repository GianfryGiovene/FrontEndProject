import { useSelector } from 'react-redux';
import AdminJobsSection from './../components/AdminJobsSection';
import UserJobsSection from '../components/UserJobsSection';
import { Box, Typography } from '@mui/material';

const JobsPage = () => {

    const userLogged = useSelector(state => state.auth.user);    
    
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(120deg, #e3f0ff 0%, #f4fafe 80%)',
                px: { xs: 1, md: 6 },
                py: { xs: 2, md: 5 },
            }}
        >
            <Typography
                variant="h3"
                fontWeight={800}
                color="primary.main"
                sx={{ mb: 4, textAlign: 'center', letterSpacing: -1 }}
            >
                Offerte di lavoro
            </Typography>
            {userLogged.role === "admin"
                ? <AdminJobsSection user={userLogged}/>
                :  <UserJobsSection user={userLogged}/>
            }
        </Box>
    );
}

export default JobsPage;