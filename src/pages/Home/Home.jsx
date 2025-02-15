import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, Grid, Select, MenuItem, IconButton, Drawer } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Add } from "@mui/icons-material";
import logo from "../../assets/logo.png";

export default function Home() {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate("/login");
    };

    const handleMenuToggle = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 40px", backgroundColor: "#fff", color: "#000", boxShadow: 1, position: "sticky", top: 0, zIndex: 1000 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="JobForge Logo" style={{ height: 50, marginRight: 10 }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ color: "#007BFF" }}>
                        JobForge
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: "block", md: "none" } }}>
                    <IconButton onClick={handleMenuToggle}>
                        <Menu />
                    </IconButton>
                </Box>

                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Button sx={{ color: "#000" }} startIcon={<Add />}>Post a Job</Button>
                    <Button sx={{ color: "#000" }}>
                        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                            Sign In
                        </Link>
                    </Button>
                    <Button variant="contained" color="primary" sx={{ ml: 2 }}>
                        <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
                            Register Now
                        </Link>
                    </Button>
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
                    <Button sx={{ color: "#000", width: "100%", marginBottom: 2 }}>Post a Job</Button>
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
                </Box>
            </Drawer>

            <Container maxWidth="md" sx={{ textAlign: "center", marginTop: 6 }}>
                <Typography variant="h3" fontWeight="bold" color="#000">
                    Find your dream job or let companies find you
                </Typography>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, backgroundColor: "#fff", padding: 2, borderRadius: 1, marginTop: 4, boxShadow: 2 }}>
                    <TextField fullWidth label="Job title or keywords" variant="outlined" sx={{ mb: { xs: 2, md: 0 }, mr: { md: 2 } }} />
                    <Select defaultValue="Anywhere" sx={{ mb: { xs: 2, md: 0 }, mr: { md: 2 }, minWidth: 150 }}>
                        <MenuItem value="Anywhere">Anywhere</MenuItem>
                    </Select>
                    <Button variant="contained" color="primary">Search</Button>
                </Box>
            </Container>
        </Box>
    );
}
