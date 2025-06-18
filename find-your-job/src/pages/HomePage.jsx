import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';

export default function HomePage() {
  const user = useSelector(state => state.auth.user);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 6, md: 10 },
        pb: 6,
        px: { xs: 1, md: 4 },
        background: 'linear-gradient(120deg, #e3f0ff 0%, #f4fafe 80%)',
      }}
    >
      <HeroSection user={user}/>
      <FeatureSection />
    </Box>
  );
}