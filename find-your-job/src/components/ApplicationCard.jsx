import {useNavigate} from 'react-router'
import { Card, CardActions, CardContent, Button, Typography, Box, Chip } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const ApplicationCard = ({application}) => {

    const navigate = useNavigate();
    const showDetails = (id) => {
        navigate(`/jobs/${id}`);
    }
   return (
        <Card
            sx={{
                maxWidth: 350,
                minHeight: 180,
                borderRadius: 6,
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 4px 24px 0 rgba(40,98,255,0.13)',
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform .13s, box-shadow .15s',
                '&:hover': {
                    transform: 'translateY(-4px) scale(1.04)',
                    boxShadow: '0 12px 36px 0 rgba(25,118,210,0.18)',
                }
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AssignmentTurnedInIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                        {application.jobTitle || `Candidatura #${application.id}`}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Sent from: <b>{application.name}</b>
                </Typography>
                {application.coverLetter && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <b>Letter:</b> {application.coverLetter.length > 80
                            ? application.coverLetter.substring(0, 77) + '...'
                            : application.coverLetter}
                    </Typography>
                )}
                {application.curriculum &&
                    <Chip label={`CV: ${application.curriculum}`} size="small" color="primary" sx={{ mb: 1, mt: 0.5 }} />}
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
                <Button
                    size="small"
                    variant="outlined"
                    sx={{
                        borderRadius: 4,
                        fontWeight: 700,
                        textTransform: 'none',
                        color: 'primary.main',
                        borderColor: 'primary.main',
                        '&:hover': {
                            background: 'rgba(25,118,210,0.08)',
                            borderColor: 'primary.dark'
                        }
                    }}
                    onClick={() => showDetails(application.jobId)}
                >
                    Go to the offer
                </Button>
            </CardActions>
        </Card>
    );
}

export default ApplicationCard;