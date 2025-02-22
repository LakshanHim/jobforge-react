import React, { useState, useEffect, useRef } from "react";
import {
    Box, Button, TextField, Typography, Container, IconButton, Drawer, Avatar, Menu as MenuComponent, MenuItem as MenuItemComponent
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Menu, Search, Mail, MapPin, Phone, Send, Briefcase } from "lucide-react";
import { Add } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile-user.png";
import { Facebook, Twitter, LinkedIn, YouTube, RssFeed } from "@mui/icons-material";
import { Grid, Card, CardContent } from "@mui/material";


export default function Home() {
    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleMenuToggle = () => {
        setOpenMenu(!openMenu);
    };

    const handleSignIn = () => navigate("/login");
    const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setAnchorEl(null);
    };

    const socialIcons = [
        { icon: <Facebook />, link: "#" },
        { icon: <Twitter />, link: "#" },
        { icon: <LinkedIn />, link: "#" },
        { icon: <YouTube />, link: "#" },
        { icon: <RssFeed />, link: "#" },
    ];

    const jobs = [
        {
            title: "Junior QA Engineer",
            company: "ShiftX",
            category: "Accounting > Other",
            type: "Full-Time",
            location: "Colombo, Sri Lanka",
            postedDate: "21/02/25",
        },
        {
            title: "Full Stack Developer",
            company: "PurePitch",
            category: "Information & Communication Technology",
            type: "Contract",
            location: "Remote, Rotterdam, Netherlands",
            postedDate: "21/02/25",
        },
        {
            title: "Project Management Internship - Technical & Non-Technical",
            company: "Tezzeract Pvt Ltd",
            category: "Information & Communication Technology > Programme & Project Management",
            type: "Internship",
            location: "Colombo, Sri Lanka",
            salary: "LKR 30,000 - 35,000/month",
            postedDate: "21/02/25",
        },
        {
            title: "Machine Learning Engineer",
            company: "PurePitch",
            category: "Information & Communication Technology",
            type: "Contract",
            location: "Remote, Rotterdam, Netherlands",
            postedDate: "21/02/25",
        }
    ];

    return (
        <>
            <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 40px", backgroundColor: "#fff", boxShadow: 1, position: "sticky", top: 0, zIndex: 1000 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src={logo} alt="JobForge Logo" style={{ height: 50, marginRight: 10 }} />
                        <Typography variant="h5" fontWeight="bold" sx={{ color: "#007BFF" }}>JobForge</Typography>
                    </Box>
                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <IconButton onClick={handleMenuToggle}>
                            <Menu />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                        {isAuthenticated ? (
                            <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
                                <Avatar src={profile} sx={{ width: 40, height: 40, mr: 1, cursor: "pointer" }} onClick={handleProfileClick} />
                                <Typography variant="body1" fontWeight="bold" onClick={handleProfileClick} sx={{ cursor: "pointer" }}>Lakshan</Typography>
                                <MenuComponent anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                    <MenuItemComponent onClick={handleLogout}>Logout</MenuItemComponent>
                                </MenuComponent>
                            </Box>
                        ) : (
                            <>
                                <Button sx={{ color: "#000" }} startIcon={<Add />}>
                                    <Link to="/company" style={{ cursor: "pointer", textDecoration: "none", color: 'black' }}>
                                        Post a Job
                                    </Link>
                                </Button>
                                <Button sx={{ color: "#000" }}>
                                    <Link to="/login" style={{ textDecoration: "none", color: "black" }}>Sign In</Link>
                                </Button>
                                <Button variant="contained" color="primary" sx={{ ml: 2 }}>
                                    <Link to="/register" style={{ textDecoration: "none", color: "white" }}>Register Now</Link>
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>

                <Drawer
                    anchor="left"
                    open={openMenu}
                    onClose={handleMenuToggle}
                    sx={{
                        display: { xs: "block", md: "none" },
                        zIndex: 1200
                    }}
                >
                    <Box sx={{ width: 250, padding: 2 }}>
                        {isAuthenticated ? (
                            <>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <Avatar src={profile} sx={{ width: 40, height: 40, mr: 1 }} />
                                    <Typography variant="body1" fontWeight="bold">Lakshan</Typography>
                                </Box>
                                <Button sx={{ color: "#000", width: "100%", marginBottom: 2 }} onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button sx={{ color: "#000", width: "100%", marginBottom: 2 }}>
                                    <Link to="/company" style={{ cursor: "pointer", textDecoration: "none", color: 'black' }}>
                                        Post a Job
                                    </Link>
                                </Button>
                                <Button sx={{ color: "#000", width: "100%", marginBottom: 2 }}>
                                    <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                                        Sign In
                                    </Link>
                                </Button>
                                <Button variant="contained" color="primary" sx={{ width: "100%" }}>
                                    <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
                                        Register Now
                                    </Link>
                                </Button>
                            </>
                        )}
                    </Box>

                </Drawer>

                <Container maxWidth="xl" sx={{ marginTop: 6 }}>
                    <Typography variant="h3" fontWeight="bold" color="#000" maxWidth="md" sx={{ textAlign: "left", opacity: 0.6 }}>
                        Your next career move starts here—discover, apply, succeed!
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            backgroundColor: "#fff",
                            padding: 3,
                            borderRadius: 1,
                            marginTop: 4,
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                            alignItems: "center",
                            mb: 2
                        }}
                    >
                        <TextField
                            label="Job title or keywords"
                            variant="outlined"
                            sx={{
                                flexGrow: 10,
                                mb: { xs: 2, md: 0 },
                                mr: { md: 2 },
                                "& .MuiInputBase-root": { height: 55 },
                            }}
                            InputProps={{
                                startAdornment: <Search size={25} style={{ marginRight: 8 }} />,
                            }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                flexGrow: 1,
                                minWidth: "200px",
                                padding: 2,
                                fontSize: 15,
                                fontWeight: "bold",
                                height: 55,
                            }}
                        >
                            Search
                        </Button>
                    </Box>

                    {jobs.map((job, index) => (
                        <Card key={index} sx={{ marginBottom: 2, boxShadow: 3, borderRadius: 2, padding: 2 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">{job.title}</Typography>
                                <Typography variant="subtitle2" color="primary">{job.company}</Typography>
                                <Typography variant="body2" color="text.secondary">{job.category}</Typography>

                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                    <Briefcase size={16} />
                                    <Typography variant="body2">{job.type}</Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                    <MapPin size={16} />
                                    <Typography variant="body2">{job.location}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Container>
            </Box >




            <Box
                component="footer"
                sx={{
                    backgroundColor: "#222",
                    color: "white",
                    py: 4,
                    px: { xs: 2, sm: 6, md: 10 },
                }}
            >
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <img src={logo} alt="JobForge Logo" style={{ height: 50, marginRight: 10 }} />
                            <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>JobForge</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Simply #1 Real Estate Theme
                        </Typography>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <a href="/" style={{ color: "white", textDecoration: "none" }}>
                                    Home
                                </a>
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <a href="/blog" style={{ color: "white", textDecoration: "none" }}>
                                    Blog
                                </a>
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <a href="/list-layout" style={{ color: "white", textDecoration: "none" }}>
                                    List Layout
                                </a>
                            </Typography>
                            <Typography variant="body2">
                                <a href="/contact" style={{ color: "white", textDecoration: "none" }}>
                                    Contact
                                </a>
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                            Contact Us
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                            <MapPin size={18} style={{ marginRight: 8 }} />
                            <Typography variant="body2">
                                'Thusara', Nauththuduwa, mathugama.
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                            <Phone size={18} style={{ marginRight: 8 }} />
                            <Typography variant="body2">+94713502267</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Mail size={18} style={{ marginRight: 8 }} />
                            <Typography variant="body2">lakshan.him@gmail.com</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                            Remain Updated
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Your email address"
                            sx={{ backgroundColor: "white", borderRadius: 1, mb: 2 }}
                        />
                        <Button variant="contained" fullWidth startIcon={<Send />} sx={{ backgroundColor: '#6866f3' }}>
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                    {socialIcons.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            style={{ margin: "0 10px", color: "white" }}
                        >
                            {item.icon}
                        </a>
                    ))}
                </Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ mt: 4, fontSize: "0.8rem" }}
                >
                    <Typography>© 2023. All rights reserved.</Typography>
                    <Typography>Designed by Lakshan Himalaka</Typography>
                </Box>
            </Box>
        </>
    );
}