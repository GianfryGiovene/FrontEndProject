import { BrowserRouter, Routes, Route} from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/jobs/JobDetailPage'
import Navbar from './components/Navbar'
import CreateJobPage from './pages/jobs/CreateJobPage'
import ApplyPage from './pages/applications/ApplyPage'
import ApplicationsPage from './pages/applications/ApplicationsPage'

function App() {
const BASE_URL = "http://localhost:3001";
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailPage />} />
        <Route path="/create-new-job-offer" element={<CreateJobPage/>} />
        <Route path="/applications/:jobId/add-application" element={<ApplyPage />} />
        <Route path="/:userId/applications" element={<ApplicationsPage />} />
      </Routes>
    </BrowserRouter>    
  )
}
export default App
