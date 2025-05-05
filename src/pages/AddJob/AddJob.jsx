import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Card, CardContent, CardMedia, Typography,
    Grid, Container, Drawer, IconButton, Avatar, Button,TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";


const CoursePage = () => {
    const username = localStorage.getItem("username")
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [qualification, setQualification] = useState('');
    const [jobClosingDate, setJobClosingDate] = useState('');
    const [message, setMessage] = useState('');

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:8080/v1/job_details/addJob/${userId}`,
                {
                    jobTitle,
                    jobDescription,
                    qualification,
                    jobClosingDate
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                setMessage("Job added successfully!");
                // Optionally clear form
                setJobTitle('');
                setJobDescription('');
                setQualification('');
                setJobClosingDate('');
            } else {
                setMessage("Failed to add job.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error occurred while adding the job.");
        }
    };




    const [courses, setCourses] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);

    const handleMenuToggle = () => {
        setOpenMenu(!openMenu);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const username = localStorage.getItem("username");
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
                        localStorage.setItem("profileImageUrl", imageUrl);
                    } else {
                        console.error("Failed to fetch profile image");
                    }
                } else {
                    console.error("Username not found in localStorage");
                }
            } catch (error) {
                console.error("Error fetching profile image:", error);
            }
        };

        fetchProfileImage();
    }, []);

    const [profileImageUrl, setProfileImageUrl] = useState("");



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
                    <Button
                        sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}
                        component={Link}
                        to="/profile"
                    >
                        VIEW PROFILE
                    </Button>
                    <Button
                        sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}
                        component={Link}
                        to="/home"
                    >
                        Job
                    </Button>
                    <Button
                        sx={{ color: "#000", width: "100%", marginBottom: 2 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Drawer>

            <Container maxWidth="sm">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>Add New Job</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Job Title"
                            fullWidth
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Job Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Qualification"
                            fullWidth
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Job Closing Date"
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={jobClosingDate}
                            onChange={(e) => setJobClosingDate(e.target.value)}
                            margin="normal"
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Submit Job
                        </Button>
                    </form>
                    {message && (
                        <Typography sx={{ mt: 2, color: 'green' }}>{message}</Typography>
                    )}
                </Box>
            </Container>

        </Box>
    );
};

export default CoursePage;

