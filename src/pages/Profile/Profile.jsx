import React, { useState, useEffect } from "react";
import {
    Box, Button, Typography, IconButton, Drawer, Avatar, Input
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
    Menu as MenuIcon, Email as EmailIcon, Language as LanguageIcon,
    Instagram as InstagramIcon, Twitter as TwitterIcon,
    UploadFile, Update, Delete
} from "@mui/icons-material";
import { Card, CardContent, CardActions } from "@mui/material";

import logo from "../../assets/logo.png";
import profile from "../../assets/profile-user.png";

export default function Profile() {
    const [openMenu, setOpenMenu] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);

    const username = localStorage.getItem("username") || "Guest";
    const firstName = localStorage.getItem("firstname");
    const lastName = localStorage.getItem("lastname");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role"); 

    const handleMenuToggle = () => setOpenMenu(!openMenu);
    const navigate = useNavigate();

    const handleAddJob = () => navigate(`/addjob`);
    const handleAddCourse = () => navigate(`/addcourse`);
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const fetchProfileImage = async () => {
        try {
            if (username) {
                const response = await fetch(`http://localhost:8080/v1/user/get/profileImg/${username}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
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

    const fetchCoverImage = async () => {
        try {
            if (username) {
                const response = await fetch(`http://localhost:8080/v1/user/getImageCover/${username}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                });
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setCoverImageUrl(imageUrl);
                }
            }
        } catch (error) {
            console.error("Error fetching cover image:", error);
        }
    };

    useEffect(() => {
        fetchProfileImage();
        fetchCoverImage();
    }, [username]);

    const handleProfileUpload = async () => {
        if (!profileImageFile) return;
        const formData = new FormData();
        formData.append("file", profileImageFile);

        try {
            await fetch(`http://localhost:8080/v1/user/uploadProfileImg/${username}`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                body: formData,
            });
            fetchProfileImage();
            alert("Profile picture uploaded successfully!");
        } catch (error) {
            console.error("Error uploading profile image:", error);
        }
    };

    const handleProfileUpdate = async () => {
        if (!profileImageFile) return;
        const formData = new FormData();
        formData.append("file", profileImageFile);

        try {
            await fetch(`http://localhost:8080/v1/user/update/imageProfile/${username}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                body: formData,
            });
            fetchProfileImage();
            alert("Profile picture updated successfully!");
        } catch (error) {
            console.error("Error updating profile image:", error);
        }
    };

    const handleProfileDelete = async () => {
        try {
            await fetch(`http://localhost:8080/v1/user/delete/imageProfile/${username}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
            });
            setProfileImageUrl("");
            alert("Profile picture deleted successfully!");
        } catch (error) {
            console.error("Error deleting profile image:", error);
        }
    };

    const handleCoverUpload = async () => {
        if (!coverImageFile) return;
        const formData = new FormData();
        formData.append("file", coverImageFile);

        try {
            await fetch(`http://localhost:8080/v1/user/uploadCoverImg/${username}`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                body: formData,
            });
            fetchCoverImage();
            alert("Cover photo uploaded successfully!");
        } catch (error) {
            console.error("Error uploading cover image:", error);
        }
    };

    const handleCoverUpdate = async () => {
        if (!coverImageFile) return;
        const formData = new FormData();
        formData.append("file", coverImageFile);

        try {
            await fetch(`http://localhost:8080/v1/user/update/imageCover/${username}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                body: formData,
            });
            fetchCoverImage();
            alert("Cover photo updated successfully!");
        } catch (error) {
            console.error("Error updating cover image:", error);
        }
    };

    const handleCoverDelete = async () => {
        try {
            await fetch(`http://localhost:8080/v1/user/delete/imageCover/${username}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
            });
            setCoverImageUrl("");
            alert("Cover photo deleted successfully!");
        } catch (error) {
            console.error("Error deleting cover image:", error);
        }
    };

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


                    {(role === "EMPLOYEES" || role === "ADMIN") && (
                        <Button
                            sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}
                            component={Link}
                            to="/home"
                        >
                            Job
                        </Button>
                    )}

                    {(role === "TRAINER" || role === "ADMIN") && (
                        <Button
                            sx={{ color: "blue", width: "100%", marginBottom: 2, fontWeight: 'bold' }}
                            component={Link}
                            to="/course"
                        >
                            Courses
                        </Button>
                    )}


                    <Button sx={{ color: "#000", width: "100%", marginBottom: 2 }} onClick={handleLogout}>
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
                    <Typography variant="h5" fontWeight="bold">{username}</Typography>
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


                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: -5 }}>
                        {role === "TRAINER" && (
                            <Button variant="outlined" color="primary" onClick={handleAddCourse}>
                                Add Course
                            </Button>
                        )}
                        {role === "EMPLOYEES" && (
                            <Button variant="outlined" color="primary" onClick={handleAddJob}>
                                Add Job
                            </Button>
                        )}
                    </Box>
                </Box>


                <Box sx={{ marginTop: 5, paddingX: 5 }}>
                    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Cover Photo
                            </Typography>
                            <Input type="file" onChange={(e) => setCoverImageFile(e.target.files[0])} />
                        </CardContent>
                        <CardActions sx={{ justifyContent: "flex-end", paddingX: 2, paddingBottom: 2 }}>
                            <Button variant="contained" startIcon={<UploadFile />} onClick={handleCoverUpload}>Upload</Button>
                            <Button variant="outlined" startIcon={<Update />} onClick={handleCoverUpdate}>Update</Button>
                            <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleCoverDelete}>Delete</Button>
                        </CardActions>
                    </Card>
                </Box>


                <Box sx={{ marginTop: 5, paddingX: 5, marginBottom: 5 }}>
                    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Profile Picture
                            </Typography>
                            <Input type="file" onChange={(e) => setProfileImageFile(e.target.files[0])} />
                        </CardContent>
                        <CardActions sx={{ justifyContent: "flex-end", paddingX: 2, paddingBottom: 2 }}>
                            <Button variant="contained" startIcon={<UploadFile />} onClick={handleProfileUpload}>Upload</Button>
                            <Button variant="outlined" startIcon={<Update />} onClick={handleProfileUpdate}>Update</Button>
                            <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleProfileDelete}>Delete</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
