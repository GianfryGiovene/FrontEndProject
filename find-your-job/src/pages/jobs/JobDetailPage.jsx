import {useParams} from 'react-router';
import { Box, Card, CardContent, Typography, Button, Stack, Paper, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 320, md: 400 },
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const JobDetailPage = () => {
    const navigate = useNavigate();
  const { jobId } = useParams();
  const location = useLocation();
  const user = location.state?.user || {};
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState('');
  const [job, setJob] = useState({
    title: '',
    description: '',
    category: '',
    applications: 0
  });
  const [candidates, setCandidates] = useState([]);

  const getJobDetail = async () => {
    const response = await axios.get(`${BASE_URL}/jobs/${jobId}`);
    setJob(response.data ?? {});
    const getCandidates = await axios.get(`${BASE_URL}/applications?jobId=${jobId}`);
    setCandidates(getCandidates.data ?? []);
  };

  const downloadCV = (id) => {
    // Simulazione download, qui inserisci la tua logica reale!
    alert(`Download CV candidato id ${id}`);
  };

  const handleOpenCoverLetter = (letter) => {
    setSelectedCoverLetter(letter);
    setCoverLetterOpen(true);
  };

  const handleCloseCoverLetter = () => {
    setCoverLetterOpen(false);
    setSelectedCoverLetter('');
  };

  useEffect(() => {
    getJobDetail();
  }, []);

  return (
    <Box sx={{
      mt: { xs: 2, md: 4 },
      display: "flex",
      justifyContent: "center",
      alignItems: "start",
      minHeight: '90vh',
      background: 'linear-gradient(120deg, #e3f0ff 0%, #f4fafe 100%)',
      px: 2
    }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 720,
          boxShadow: '0 8px 32px 0 rgba(25,118,210,0.14)',
          borderRadius: 5,
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(2.5px)',
          p: { xs: 1, md: 2 }
        }}>
        <CardContent>
          <Typography variant="h4" component="div" fontWeight={800} color="primary.main" gutterBottom>
            {job.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            <b>Category:</b> {job.category}
          </Typography>
          <Typography variant="h6" mt={3} mb={1} color="primary">
            Descriptions
          </Typography>
          <Typography variant="body1" gutterBottom>
            {job.description}
          </Typography>

          {user.role === 'admin' && (
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6" fontWeight={700} mb={2} color="primary">Candidates</Typography>
              <TableContainer component={Paper}
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 6px 32px 0 rgba(40,98,255,0.07)',
                  background: 'rgba(255,255,255,0.98)',
                  mb: 2,
                  overflowX: 'auto'
                }}
              >
                <Table sx={{ minWidth: 450 }}>
                  <TableHead>
                    <TableRow sx={{ background: 'linear-gradient(90deg, #e3f0ff 40%, #f4fafe 100%)' }}>
                      <TableCell sx={{ fontWeight: 900 }}>Id</TableCell>
                      <TableCell sx={{ fontWeight: 900 }} align="right">Name</TableCell>
                      <TableCell sx={{ fontWeight: 900 }} align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {candidates.map((row) => (
                      <TableRow key={row.id}
                        hover
                        sx={{
                          transition: 'background .13s',
                          '&:hover': { background: '#f6faff' }
                        }}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            sx={{ borderRadius: 4, fontWeight: 700, mr: 1, textTransform: 'none' }}
                            onClick={() => downloadCV(row.id)}
                          >
                            Download cv
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            sx={{
                              borderRadius: 4,
                              fontWeight: 700,
                              textTransform: 'none',
                              background: 'linear-gradient(90deg,#1976d2 0%, #1a73e8 100%)'
                            }}
                            onClick={() => handleOpenCoverLetter(row.coverLetter)}
                          >
                            Cover Letter
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          <Stack direction="row" spacing={2} mt={4}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: 50,
                fontWeight: 700,
                px: 4
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            {user.role === 'user' && (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 50,
                  fontWeight: 700,
                  px: 4,
                  background: 'linear-gradient(90deg,#1a73e8 0%, #1976d2 100%)'
                }}
                onClick={() => navigate(`/applications/${job.id}/add-application`, { state: { user, job } })}
              >
                Apply now
              </Button>
            )}
          </Stack>

          {/* Modal cover letter */}
          <Modal
            open={coverLetterOpen}
            onClose={handleCloseCoverLetter}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <IconButton onClick={handleCloseCoverLetter}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography id="modal-modal-title" variant="h6" fontWeight={700} color="primary" mb={2}>
                Cover Letter
              </Typography>
              <Typography id="modal-modal-description">
                {selectedCoverLetter || "Nessuna cover letter disponibile."}
              </Typography>
            </Box>
          </Modal>
        </CardContent>
      </Card>
    </Box>
  );
}

export default JobDetailPage;