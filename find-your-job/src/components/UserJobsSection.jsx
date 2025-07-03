import axios from 'axios';
import JobCard from './JobCard'
import {useState, useEffect} from 'react';
import { Box, Typography } from '@mui/material';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserJobsSection = ({user}) => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getJobs = async () => {
            var response = await axios.get(`${BASE_URL}/jobs`);
            if(response.status === 200){
                if(response.data.length <= 0){
                    return;            
                }
                setJobs(response.data);
            }
        }
        getJobs();
    }, []);
    
    return (
        <Box>
            <Typography
                variant="h5"
                fontWeight={700}
                color="primary.main"
                sx={{ mb: 3, textAlign: 'center', letterSpacing: -0.5 }}
            >
                Opportunity for you
            </Typography>
            <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                justifyContent="center"
            >
                {jobs && jobs.length > 0
                    ? jobs.map(job => (
                        <JobCard key={job.id} job={job} user={user} />
                    ))
                    : <Typography color="text.secondary">No offers at the moment.</Typography>
                }
            </Box>
        </Box>
    );
}

export default UserJobsSection;
