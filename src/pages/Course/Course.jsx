import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent, CardMedia, Typography,
  Grid, Container, Drawer, IconButton, Avatar, Button, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { Search, Mail, MapPin, Phone, Send, Briefcase } from "lucide-react";






const CoursePage = () => {

  const username = localStorage.getItem("username")
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [courseImages, setCourseImages] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const role = localStorage.getItem("role");

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDelete = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/v1/course/deleteCourse/${courseId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }
      });

      setCourses(prevCourses => prevCourses.filter(course => course.courseId !== courseId));
      alert("Course deleted successfully");
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete course");
    }
  };

  const handleUpdate = (courseId) => {
    navigate(`/update-course/${courseId}`);
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



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/v1/course/getAllACourse', {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });

        const courses = response.data.content;
        setCourses(courses);


        for (const course of courses) {
          await fetchCourseImage(course.courseId);
        }

      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    const fetchCourseImage = async (courseId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/v1/course/getImg/${courseId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setCourseImages(prev => ({ ...prev, [courseId]: imageUrl }));
        } else {
          console.error(`Failed to fetch image for course ${courseId}`);
        }
      } catch (error) {
        console.error(`Error fetching course image ${courseId}:`, error);
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
          <Button sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}>
            <Link to="/profile" style={{ textDecoration: "none" }}>View Profile</Link>
          </Button>

          {role === "ADMIN" && (
            <Button
              sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}
              component={Link}
              to="/home"
            >
              Job
            </Button>
          )}

          <Button
            sx={{ color: "#000", width: "100%", marginBottom: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Courses */}
      <Container sx={{ mt: 5 }} maxWidth="xl">
        <Typography variant="h3" fontWeight="bold" color="#000" maxWidth="md" sx={{ textAlign: "left", opacity: 0.6 }}>
          Your next career move starts here—discover, apply, succeed!
        </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, backgroundColor: "#fff", padding: 3, borderRadius: 1, marginTop: 4, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", alignItems: "center", mb: 2 }}>
          <TextField label="Job title or keywords" variant="outlined" sx={{ flexGrow: 10, mb: { xs: 2, md: 0 }, mr: { md: 2 }, "& .MuiInputBase-root": { height: 55 } }} InputProps={{ startAdornment: <Search size={25} style={{ marginRight: 8 }} /> }} />
          <Button variant="contained" color="primary" sx={{ flexGrow: 1, minWidth: "200px", padding: 2, fontSize: 15, fontWeight: "bold", height: 55 }}>Search</Button>
        </Box>
        <Grid container spacing={4}>
          {courses.map(course => (
            <Grid item xs={12} sm={6} md={4} key={course.courseId}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={courseImages[course.courseId]}
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

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleUpdate(course.courseId)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(course.courseId)}
                    >
                      Delete
                    </Button>
                  </Box>
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
