import React, { useState, useEffect } from "react";
import {
    Box, Button, TextField, Typography, Container, IconButton, Drawer, Avatar, Grid, Card, CardContent
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Menu as MenuIcon, Facebook, Twitter, LinkedIn, YouTube, RssFeed } from "@mui/icons-material";
import { Search, Mail, MapPin, Phone, Send } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Home() {
    const username = localStorage.getItem("username");
    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const [jobs, setJobs] = useState([]);
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        setIsAuthenticated(!!token);
        if (role) setUserRole(role);
    }, []);

    const handleEdit = (job) => {
        navigate(`/updateJob/${job.jobId}`, { state: { job } });
    };

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {
            const response = await fetch(`http://localhost:8080/v1/job_details/deleteJob/${jobId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                setJobs(prevJobs => prevJobs.filter(job => job.jobId !== jobId));
            } else {
                console.error("Failed to delete job");
            }
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;
            try {
                const response = await fetch(`http://localhost:8080/v1/job_details/getJobsUserId/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (!response.ok) throw new Error("Failed to fetch jobs");
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
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
                        localStorage.setItem("profileImageUrl", imageUrl);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile image:", error);
            }
        };

        fetchProfileImage();
    }, []);

    const handleMenuToggle = () => setOpenMenu(!openMenu);
    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        window.location.href = "/";
    };

    const socialIcons = [
        { icon: <Facebook />, link: "#" },
        { icon: <Twitter />, link: "#" },
        { icon: <LinkedIn />, link: "#" },
        { icon: <YouTube />, link: "#" },
        { icon: <RssFeed />, link: "#" },
    ];

    return (
        <>
            <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 40px", backgroundColor: "#fff", boxShadow: 1, position: "sticky", top: 0, zIndex: 1000 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src={logo} alt="JobForge Logo" style={{ height: 50, marginRight: 10 }} />
                        <Typography variant="h5" fontWeight="bold" sx={{ color: "#007BFF" }}>JobForge</Typography>
                    </Box>
                    <IconButton onClick={handleMenuToggle}><MenuIcon /></IconButton>
                </Box>

                <Drawer anchor="left" open={openMenu} onClose={handleMenuToggle}>
                    <Box sx={{ width: 250, padding: 2 }}>
                        {isAuthenticated ? (
                            <>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <Avatar src={profileImageUrl} sx={{ width: 40, height: 40, mr: 1 }} />
                                    <Typography variant="body1" fontWeight="bold">{username}</Typography>
                                </Box>
                                <Button sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}>
                                    <Link to="/profile" style={{ textDecoration: "none" }}>View Profile</Link>
                                </Button>

                                {/* 👇 Only show Courses button if ADMIN */}
                                {userRole === "ADMIN" && (
                                    <Button sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}>
                                        <Link to="/course" style={{ textDecoration: "none" }}>Courses</Link>
                                    </Button>
                                )}

                                <Button sx={{ color: "#000", width: "100%", marginBottom: 2 }} onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button sx={{ color: "#000", width: "100%", marginBottom: 2 }}>
                                    <Link to="/login" style={{ textDecoration: "none", color: "black" }}>Sign In</Link>
                                </Button>
                                <Button variant="contained" color="primary" sx={{ width: "100%" }}>
                                    <Link to="/register" style={{ textDecoration: "none", color: "white" }}>Register Now</Link>
                                </Button>
                            </>
                        )}
                    </Box>
                </Drawer>

                <Container maxWidth="xl" sx={{ marginTop: 6 }}>
                    <Typography variant="h3" fontWeight="bold" color="#000" maxWidth="md" sx={{ textAlign: "left", opacity: 0.6 }}>
                        Your next career move starts here—discover, apply, succeed!
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, backgroundColor: "#fff", padding: 3, borderRadius: 1, marginTop: 4, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", alignItems: "center", mb: 2 }}>
                        <TextField label="Job title or keywords" variant="outlined" sx={{ flexGrow: 10, mb: { xs: 2, md: 0 }, mr: { md: 2 }, "& .MuiInputBase-root": { height: 55 } }} InputProps={{ startAdornment: <Search size={25} style={{ marginRight: 8 }} /> }} />
                        <Button variant="contained" color="primary" sx={{ flexGrow: 1, minWidth: "200px", padding: 2, fontSize: 15, fontWeight: "bold", height: 55 }}>Search</Button>
                    </Box>

                    {jobs.map((job) => (
                        <Card key={job.jobId} sx={{ marginBottom: 2, boxShadow: 3, borderRadius: 2, padding: 2 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">{job.jobTitle}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{job.jobDescription}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Qualification: {job.qualification}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>Closing Date: {job.jobClosingDate}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: -5 }}>
                                    <Button variant="outlined" color="primary" onClick={() => handleEdit(job)}>Edit</Button>
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(job.jobId)}>Delete</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Container>
            </Box>

            {/* Footer section remains unchanged */}
            <Box component="footer" sx={{ backgroundColor: "#222", color: "white", py: 4, px: { xs: 2, sm: 6, md: 10 } }}>
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <img src={logo} alt="JobForge Logo" style={{ height: 50, marginRight: 10 }} />
                            <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>JobForge</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2 }}>Simply #1 Real Estate Theme</Typography>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}><a href="/" style={{ color: "white", textDecoration: "none" }}>Home</a></Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}><a href="/blog" style={{ color: "white", textDecoration: "none" }}>Blog</a></Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}><a href="/list-layout" style={{ color: "white", textDecoration: "none" }}>List Layout</a></Typography>
                            <Typography variant="body2"><a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</a></Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Contact Us</Typography>
                        <Box display="flex" alignItems="center" sx={{ mb: 1 }}><MapPin size={18} style={{ marginRight: 8 }} /><Typography variant="body2">'Thusara', Nauththuduwa, Mathugama.</Typography></Box>
                        <Box display="flex" alignItems="center" sx={{ mb: 1 }}><Phone size={18} style={{ marginRight: 8 }} /><Typography variant="body2">+94713502267</Typography></Box>
                        <Box display="flex" alignItems="center"><Mail size={18} style={{ marginRight: 8 }} /><Typography variant="body2">lakshan.him@gmail.com</Typography></Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Remain Updated</Typography>
                        <TextField fullWidth variant="outlined" size="small" placeholder="Your email address" sx={{ backgroundColor: "white", borderRadius: 1, mb: 2 }} />
                        <Button variant="contained" fullWidth startIcon={<Send />} sx={{ backgroundColor: '#6866f3' }}>Sign Up</Button>
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                    {socialIcons.map((item, index) => (
                        <a key={index} href={item.link} style={{ margin: "0 10px", color: "white" }}>
                            {item.icon}
                        </a>
                    ))}
                </Box>

                <Box display="flex" justifyContent="space-between" sx={{ mt: 4, fontSize: "0.8rem" }}>
                    <Typography>© 2023. All rights reserved.</Typography>
                    <Typography>Designed by Lakshan Himalaka</Typography>
                </Box>
            </Box>
        </>
    );
}
