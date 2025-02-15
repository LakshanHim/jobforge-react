import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

export default function Home() {
    const navigate = useNavigate();


    const handleLogout = () => {
        const token = localStorage.getItem("token"); 
        localStorage.removeItem("token");
        console.log("not:"+token); 
        navigate("/");
    };

    return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h4">🏠 Home Page</Typography>
            <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{ mt: 2 }}
            >
                Logout
            </Button>
        </Box>
    );
}
