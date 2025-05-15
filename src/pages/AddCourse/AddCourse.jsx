import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Card, CardContent, CardMedia, Typography,
    Grid, Container, Drawer, IconButton, Avatar, Button, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";


const CoursePage = () => {
    const username = localStorage.getItem("username")

    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseQualification, setCourseQualification] = useState('');
    const [courseContent, setCourseContent] = useState('');
    const [courseStartDate, setCourseStartDate] = useState('');
    const [courseImage, setCourseImage] = useState(null);
    const [message, setMessage] = useState('');

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const handleCourseSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `http://localhost:8080/v1/course/addCourse/${userId}`,
                {
                    courseTitle,
                    courseDescription,
                    courseQualification,
                    courseContent,
                    courseStartDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const courseId = res.data.courseId || res.data.id || 1;

            if (courseImage && courseId) {
                const formData = new FormData();
                formData.append("file", courseImage);

                await axios.post(
                    `http://localhost:8080/v1/course/uploadImg/${courseId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            }

            setMessage("Course added successfully!");
            setCourseTitle('');
            setCourseDescription('');
            setCourseQualification('');
            setCourseContent('');
            setCourseStartDate('');
            setCourseImage(null);

        } catch (err) {
            console.error(err);
            setMessage("Failed to add course.");
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
                        to="/course"
                    >
                        Courses
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
                    <Typography variant="h4" gutterBottom>Add New Course</Typography>
                    <form onSubmit={handleCourseSubmit}>
                        <TextField
                            label="Course Title"
                            fullWidth
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Qualification"
                            fullWidth
                            value={courseQualification}
                            onChange={(e) => setCourseQualification(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Course Content"
                            fullWidth
                            multiline
                            rows={4}
                            value={courseContent}
                            onChange={(e) => setCourseContent(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Start Date"
                            type="date"
                            fullWidth
                            value={courseStartDate}
                            onChange={(e) => setCourseStartDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                            required
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 2 }}
                        >
                            Upload Course Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => setCourseImage(e.target.files[0])}
                            />
                        </Button>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Add Course
                        </Button>
                    </form>
                    {message && <Typography sx={{ mt: 2, color: 'green' }}>{message}</Typography>}
                </Box>
            </Container>

        </Box>
    );
};

export default CoursePage;


