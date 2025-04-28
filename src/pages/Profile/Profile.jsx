import React, { useState, useEffect } from "react";
import {
    Box, Button, Typography, IconButton, Drawer, Avatar
} from "@mui/material";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

import logo from "../../assets/logo.png";
import profile from "../../assets/profile-user.png";

export default function Profile() {
    const [openMenu, setOpenMenu] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const username = localStorage.getItem("username") || "Guest";
    const firstName = localStorage.getItem("firstname")
    const lastName = localStorage.getItem("lastname")
    const email = localStorage.getItem("email")
    const registerDate = localStorage.getItem("registerDate")
    const [coverImageUrl, setCoverImageUrl] = useState("");


    const handleMenuToggle = () => setOpenMenu(!openMenu);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/";
    };

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                if (username) {
                    const response = await fetch(`http://localhost:8080/v1/user/get/profileImg/${username}`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    if (response.ok) {
                        const blob = await response.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        setProfileImageUrl(imageUrl);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch profile image", error);
            }
        };

        fetchProfileImage();
    }, [username]);

    useEffect(() => {
        const fetchCoverImage = async () => {
            try {
                const username = localStorage.getItem("username");
                if (username) {
                    const response = await fetch(`http://localhost:8080/v1/user/getImageCover/${username}`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    });

                    if (response.ok) {
                        const blob = await response.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        setCoverImageUrl(imageUrl);
                    } else {
                        console.error("Failed to fetch cover image.");
                    }
                }
            } catch (error) {
                console.error("Error fetching cover image:", error);
            }
        };

        fetchCoverImage();
    }, []);


    return (
        <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
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
                        to="/"
                    >
                        Home Page
                    </Button>
                    <Button
                        sx={{ color: "#000", width: "100%", marginBottom: 2 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Drawer>


            <Box sx={{ width: "100%", bgcolor: "#f5f5f5" }}>

                <Box
                    sx={{
                        width: "100%",
                        height: "300px",
                        backgroundImage: `url(${coverImageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                    }}
                >
                    <Avatar
                        src={profileImageUrl}
                        sx={{
                            width: 150,
                            height: 150,
                            position: "absolute",
                            bottom: -75,
                            left: 50,
                            border: "5px solid white",
                            backgroundColor: "#fff"
                        }}
                    />
                </Box>

                <Box sx={{ marginTop: 10, paddingX: 5 }}>
                    <Typography variant="h5" fontWeight="bold">
                        {username}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={2}>
                        Advisor and Consultant at Stripe Inc.
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2, color: "gray" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <EmailIcon fontSize="small" />
                            <Typography variant="body2">{email}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <LanguageIcon fontSize="small" />
                            <Typography variant="body2">{firstName}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <InstagramIcon fontSize="small" />
                            <Typography variant="body2">{firstName}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <TwitterIcon fontSize="small" />
                            <Typography variant="body2">{firstName}_{lastName}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
