import {Grid, Card, CardContent, Typography } from '@mui/material';

const FeatureSection = () => {
    const cards = [{
          title: 'Advanced Research',
          desc: 'Filter through hundreds of offers using position, sector, and contract type.',
          icon: '🔎'
        }, {
          title: 'Save and Manage',
          desc: 'Save your favourite offers and manage them easily from your personal dashboard.',
          icon: '⭐'
        }, {
          title: 'Simplified application',
          desc: 'Complete your profile and apply in a few clicks directly online.',
          icon: '🚀'
        }];
    return (
        <Grid container spacing={4} justifyContent="center">
        {cards.map((f) => (
          <Grid item xs={12} md={4} key={f.title}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 5,
                py: 4,
                px: 3,
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 4px 24px 0 rgba(45,98,255,0.11)',
                transition: 'box-shadow .18s, transform .15s',
                minHeight: 200,
                textAlign: 'center',
                '&:hover': {
                  boxShadow: '0 8px 40px 0 rgba(24,98,235,0.14)',
                  transform: 'translateY(-4px) scale(1.03)'
                }
              }}
            >
              <div style={{ fontSize: 34, marginBottom: 10 }}>{f.icon}</div>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" fontWeight={800} color="primary" gutterBottom>
                  {f.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {f.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
}

export default FeatureSection;