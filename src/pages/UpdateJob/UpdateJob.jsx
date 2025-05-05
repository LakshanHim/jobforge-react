import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Box, Container, TextField, Button, Typography,
    Drawer, IconButton, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';

const UpdateJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        jobTitle: '',
        jobDescription: '',
        qualification: '',
        jobOpenDate: '',
        jobClosingDate: '',
        imgPath: ''
    });

    const [openMenu, setOpenMenu] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const username = localStorage.getItem("username");

    const handleMenuToggle = () => {
        setOpenMenu(!openMenu);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/job_details/searchJob/${jobId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                setJob(response.data.content);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };


        const fetchProfileImage = async () => {
            try {
                if (username) {
                    const response = await fetch(`http://localhost:8080/v1/user/get/profileImg/${username}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const blob = await response.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        setProfileImageUrl(imageUrl);
                    } else {
                        console.error("Failed to fetch profile image");
                    }
                }
            } catch (error) {
                console.error("Error fetching profile image:", error);
            }
        };

        fetchJob();
        fetchProfileImage();
    }, [jobId, username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob((prevJob) => ({
            ...prevJob,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                'http://localhost:8080/v1/job_details/updateJob',
                job,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            alert('Job updated successfully!');
            navigate('/home');
        } catch (error) {
            console.error('Error updating job:', error);
            alert('Failed to update job');
        }
    };


    return (
        <Box>
            {/* Top Navigation Bar */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 40px",
                backgroundColor: "#fff",
                boxShadow: 1,
                position: "sticky",
                top: 0,
                zIndex: 1000
            }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="JobForge Logo" style={{ height: 50, marginRight: 10 }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ color: "#007BFF" }}>JobForge</Typography>
                </Box>
                <IconButton onClick={handleMenuToggle}>
                    <MenuIcon />
                </IconButton>
            </Box>

            {/* Side Drawer */}
            <Drawer anchor="left" open={openMenu} onClose={handleMenuToggle}>
                <Box sx={{ width: 250, padding: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar src={profileImageUrl} sx={{ width: 40, height: 40, mr: 1 }} />
                        <Typography variant="body1" fontWeight="bold">{username}</Typography>
                    </Box>
                    <Button component={Link} to="/" sx={{ width: "100%", mb: 2, fontWeight: 'bold' }}>
                        Home Page
                    </Button>
                    <Button component={Link} to="/course" sx={{ width: "100%", mb: 2, fontWeight: 'bold' }}>
                        Courses
                    </Button>
                    <Button onClick={handleLogout} sx={{ width: "100%" }}>
                        Logout
                    </Button>
                </Box>
            </Drawer>

            {/* Job Edit Form */}
            <Container maxWidth="sm">
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>Update Job Details</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth margin="normal" label="Job Title" name="jobTitle" value={job.jobTitle} onChange={handleChange} />
                        <TextField fullWidth margin="normal" label="Job Description" name="jobDescription" value={job.jobDescription} onChange={handleChange} multiline rows={4} />
                        <TextField fullWidth margin="normal" label="Qualification" name="qualification" value={job.qualification} onChange={handleChange} />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Job Closing Date"
                            name="jobClosingDate"
                            type="date"
                            value={job.jobClosingDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Update Job</Button>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default UpdateJob;
