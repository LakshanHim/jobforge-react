import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Card, CardContent, CardMedia, Typography,
    Grid, Container, Drawer, IconButton, Avatar, Button, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import { useParams, useNavigate } from 'react-router-dom';

const username = localStorage.getItem("username")
const CoursePage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        courseId: courseId,
        courseTitle: '',
        courseDescription: '',
        courseQualification: '',
        courseContent: '',
        courseStartDate: '',
        userId: ''
    });

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8080/v1/course/getById/${courseId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    }
                });
                setCourseData(response.data.content);
            } catch (error) {
                console.error("Failed to fetch course:", error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8080/v1/course/updateCourse", courseData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            });
            alert("Course updated successfully");
            window.location.reload();
            window.location.href = "/course";
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update course");
        }
    };


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
                        to="/"
                    >
                        Home Page
                    </Button>
                    <Button sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}>
                        <Link to="/course" style={{ textDecoration: "none" }}>Courses</Link>
                    </Button>
                    <Button sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}>
                        <Link to="/profile" style={{ textDecoration: "none" }}>View Profile</Link>
                    </Button>
                    <Button
                        sx={{ color: "#000", width: "100%", marginBottom: 2 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Drawer>

            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>Update Course</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth label="Title" name="courseTitle" value={courseData.courseTitle}
                        onChange={handleChange} margin="normal"
                    />
                    <TextField
                        fullWidth label="Description" name="courseDescription" value={courseData.courseDescription}
                        onChange={handleChange} margin="normal" multiline rows={3}
                    />
                    <TextField
                        fullWidth label="Qualification" name="courseQualification" value={courseData.courseQualification}
                        onChange={handleChange} margin="normal"
                    />
                    <TextField
                        fullWidth label="Content" name="courseContent" value={courseData.courseContent}
                        onChange={handleChange} margin="normal" multiline rows={3}
                    />
                    <TextField
                        fullWidth label="Start Date" name="courseStartDate" type="date"
                        value={courseData.courseStartDate} onChange={handleChange} margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>Update Course</Button>
                </form>
            </Container>

        </Box>
    );
};

export default CoursePage;

