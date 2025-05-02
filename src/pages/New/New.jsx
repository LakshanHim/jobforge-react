import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent, CardMedia, Typography,
  Grid, Container, Drawer, IconButton, Avatar, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

const username = localStorage.getItem("username")
const CoursePage = () => {
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/v1/course/getAllACourse', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setCourses(response.data.content);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

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

      {/* Courses */}
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          All Courses
        </Typography>
        <Grid container spacing={4}>
          {courses.map(course => (
            <Grid item xs={12} sm={6} md={4} key={course.courseId}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.imgPath || "https://via.placeholder.com/300x140?text=No+Image"}
                  alt={course.courseTitle}
                />
                <CardContent>
                  <Typography variant="h6">{course.courseTitle}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {course.courseDescription}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <strong>Start Date:</strong> {course.courseStartDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CoursePage;
