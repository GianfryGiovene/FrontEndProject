import { Button, Box, Typography, Paper, TableRow, TableHead, TableContainer, TableBody, TableCell, Table } from '@mui/material';
import axios from 'axios'
import { useEffect, useState  } from 'react';
import { useNavigate } from 'react-router';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminJobsSection =  ({user}) => {
    
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/jobs?userId=${user.id}`);
                setJobs(response.data); // Update state               
            } catch (error) {
                console.error("Errore nel caricamento jobs:", error);
            }
        };
        if (user.id) { // Only if user is not null
            getJobs();
        }
    }, []);

    const removeJobOffer = async (id) => { 
      const jobToRemove = await axios.get(`${BASE_URL}/jobs?id=${id}`);
      if(jobToRemove.data.length <= 0){
        return;
      }
      const response = await axios.delete(`${BASE_URL}/jobs/${id}`)

      if(response.status === 200){        
        setJobs(jobs.filter(x => x.id != id));
      }
    }

    const addNewJob = () => {
      navigate("/create-new-job-offer")
    }

    const showDetails = async (id) => {
      navigate(`/jobs/${id}`, {state:{
            user:user
        }})
    }
    return (
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mb: 3, fontWeight: 700, borderRadius: 6, px: 3, py: 1,
            boxShadow: '0 2px 12px 0 rgba(21,78,220,0.09)',
            textTransform: 'none'
          }}
          onClick={addNewJob}
        >
          + Create new job offer
        </Button>
        <TableContainer component={Paper}
          sx={{
            borderRadius: 4,
            boxShadow: '0 6px 32px 0 rgba(40,98,255,0.07)',
            background: 'rgba(255,255,255,0.95)',
            mb: 4,
            overflowX: 'auto'
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="jobs-table">
            <TableHead>
              <TableRow sx={{
                background: 'linear-gradient(90deg, #e3f0ff 40%, #f4fafe 100%)'
              }}>
                <TableCell sx={{ fontWeight: 900, fontSize: 16 }}>Id</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 16 }} align="right">Titolo</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 16 }} align="right">Categoria</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 16 }} align="right">Candidati</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'background .13s',
                    '&:hover': { background: '#f6faff' }
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.applications}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ borderRadius: 4, fontWeight: 700, textTransform: 'none' }}
                        onClick={() => removeJobOffer(row.id)}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          borderRadius: 4, fontWeight: 700, textTransform: 'none',
                          background: 'linear-gradient(90deg,#1a73e8 0%, #1976d2 100%)'
                        }}
                        onClick={() => showDetails(row.id)}
                      >
                        Details
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>                          
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!jobs.length && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 4 }}>Insert the first job offer.</Typography>
        )}
      </Box>
  );
}

export default AdminJobsSection;