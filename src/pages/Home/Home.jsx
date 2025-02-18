import React, { useState, useEffect, useRef } from "react";
import {
    Box, Button, TextField, Typography, Container, IconButton, Drawer, Avatar, Menu as MenuComponent, MenuItem as MenuItemComponent
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Add } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile-user.png";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

export default function Home() {
    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const libraries = ["places"];
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCbg8xKIJhr2-VOTNbWqkuvCE-mDrXZw7U",
        libraries,
    });

    const [inputValue, setInputValue] = useState("");
    const autocompleteRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
            setInputValue(place.formatted_address);
        }
    };

    const handleSignIn = () => navigate("/login");
    const handleMenuToggle = () => setOpenMenu(!openMenu);
    const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setAnchorEl(null);
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 40px", backgroundColor: "#fff", boxShadow: 1, position: "sticky", top: 0, zIndex: 1000 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="JobForge Logo" style={{ height: 50, marginRight: 10 }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ color: "#007BFF" }}>JobForge</Typography>
                </Box>
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                    <IconButton onClick={handleMenuToggle}><Menu /></IconButton>
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
                            <Button sx={{ color: "#000" }} startIcon={<Add />}>Post a Job</Button>
                            <Button sx={{ color: "#000" }}><Link to="/login" style={{ textDecoration: "none", color: "black" }}>Sign In</Link></Button>
                            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
                                <Link to="/register" style={{ textDecoration: "none", color: "white" }}>Register Now</Link>
                            </Button>
                        </>
                    )}
                </Box>
            </Box>

            <Container maxWidth="xl" sx={{ marginTop: 6, textAlign: "center" }}>
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

                    <Autocomplete onLoad={(auto) => (autocompleteRef.current = auto)} onPlaceChanged={handlePlaceChanged}>
                        <TextField
                            label="Location"
                            variant="outlined"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            sx={{
                                flexGrow: 0.7, 
                                mb: { xs: 2, md: 0 },
                                mr: { md: 2 },
                                "& .MuiInputBase-root": { height: 55 }, 
                            }}
                        />
                    </Autocomplete>

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

            </Container>
        </Box>
    );
}