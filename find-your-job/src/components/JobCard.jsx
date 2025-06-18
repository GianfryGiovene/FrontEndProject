
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

const JobCard = ({job, user}) =>  {
    const navigate = useNavigate()
    

    const showDetails = async (id) => {
      navigate(`/jobs/${id}`)
    }
    const applyToJob = () => {
        navigate(`/applications/${job.id}/add-application`, {state:{
            user,
            job
        }})
    }
  return (
        <Card
            sx={{
                maxWidth: 320,
                minHeight: 220,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.87)',
                boxShadow: '0 4px 24px 0 rgba(40,98,255,0.14)',
                p: 1.2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform .13s, box-shadow .15s',
                '&:hover': {
                    transform: 'translateY(-4px) scale(1.04)',
                    boxShadow: '0 12px 36px 0 rgba(25,118,210,0.17)',
                    borderColor: '#1a73e8'
                }
            }}
        >
            <CardContent>
                <Typography variant="h6" fontWeight={800} color="primary" gutterBottom>
                    {job.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5, fontWeight: 700 }}>{job.category}</Typography>
                <Typography variant="body2" sx={{ minHeight: 48 }}>
                    {job.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        borderRadius: 4, fontWeight: 700, textTransform: 'none', mr: 1,
                        borderColor: '#1976d2',
                        color: '#1976d2',
                        '&:hover': {
                            background: 'rgba(25,118,210,0.06)',
                            borderColor: '#14459a',
                            color: '#14459a'
                        }
                    }}
                    onClick={() => showDetails(job.id)}
                >
                    Details
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        borderRadius: 4, fontWeight: 700, textTransform: 'none',
                        background: 'linear-gradient(90deg,#1a73e8 0%, #1976d2 100%)',
                        color: '#fff',
                        '&:hover': {
                            background: 'linear-gradient(90deg,#1976d2 0%, #1a73e8 100%)'
                        }
                    }}
                    onClick={applyToJob}
                >
                    Apply
                </Button>
            </CardActions>
        </Card>
    );
}

export default JobCard;