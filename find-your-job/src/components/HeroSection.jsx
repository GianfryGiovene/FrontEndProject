import {useNavigate } from 'react-router';
import {Box, Typography, Button } from '@mui/material';

const HeroSection = ({user}) => {
    const navigate = useNavigate();
    return (
        <Box
        sx={{
          maxWidth: 850,
          mx: 'auto',
          textAlign: 'center',
          mb: { xs: 6, md: 10 },
          p: { xs: 2, md: 5 },
          borderRadius: 6,
          boxShadow: '0 4px 32px 0 rgba(0,40,120,0.07)',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(1.5px)',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          fontWeight={800}
          mb={2}
          sx={{
            fontSize: { xs: '2.2rem', md: '3.4rem' },
            color: 'primary.main',
            letterSpacing: -1
          }}
        >
          Find the Right Job for You
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          mb={4}
          sx={{
            fontSize: { xs: '1.1rem', md: '1.35rem' },
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Welcome to <span style={{ color: '#1976d2', fontWeight: 700 }}>FindYourJob</span>, the modern platform where supply and demand meet in a simple way, transparent and fast. 
          Discover the latest offers, save your favourite ones and apply in just a few clicks.
        </Typography>
        {!user ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 7, py: 2, fontWeight: 700, borderRadius: 50,
              fontSize: { xs: '1rem', md: '1.15rem' },
              boxShadow: '0 3px 24px 0 rgba(24,98,235,0.18)',
              transition: 'transform .14s, box-shadow .16s',
              '&:hover': {
                transform: 'translateY(-3px) scale(1.04)',
                boxShadow: '0 6px 36px 0 rgba(24,98,235,0.26)'
              }
            }}
            onClick={() => navigate('/login')}
          >
            Start now
          </Button>
        ) : user.role === "admin" ? (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 6, py: 2, fontWeight: 600, borderRadius: 50,
              fontSize: { xs: '1rem', md: '1.15rem' },
              boxShadow: '0 3px 24px 0 rgba(134,77,255,0.14)',
              transition: 'transform .14s, box-shadow .16s',
              '&:hover': {
                transform: 'translateY(-3px) scale(1.04)',
                boxShadow: '0 6px 36px 0 rgba(134,77,255,0.25)'
              }
            }}
            onClick={() => navigate('/jobs')}
          >
            Go to your jobs
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 6, py: 2, fontWeight: 600, borderRadius: 50,
              fontSize: { xs: '1rem', md: '1.15rem' },
              boxShadow: '0 3px 24px 0 rgba(40,199,180,0.12)',
              transition: 'transform .14s, box-shadow .16s',
              '&:hover': {
                transform: 'translateY(-3px) scale(1.04)',
                boxShadow: '0 6px 36px 0 rgba(40,199,180,0.25)'
              }
            }}
            onClick={() => navigate('/jobs')}
          >
            Start looking for your new job
          </Button>
        )}
      </Box>
    );
}

export default HeroSection;