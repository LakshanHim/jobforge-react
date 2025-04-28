import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import illustration from "../../assets/logi.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    localStorage.setItem("username", name);
    const nameChange = (val) => setName(val.target.value);
    const passwordChange = (val) => setPassword(val.target.value);

    const clckSignIN = async () => {
        const loginData = { "username": name, "password": password };

        try {
            const response = await axios.post("http://localhost:8080/v1/user/login", loginData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                const token = response.data;
                if (token) {
                    localStorage.setItem("token", token);
                    setMessage("Login successful! Redirecting...");
                    setIsError(true);
                    setTimeout(() => navigate("/"), 2000);
                } else {
                    setMessage("Token not received.");
                    setIsError(false);
                }
            }
        } catch (error) {
            setMessage("Login failed. Please check your username and password.");
            setIsError(true);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                    flex: 1,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, fontSize: 50 }}>
                    Welcome back
                </Typography>

                {message && (
                    <Alert severity={isError ? "error" : "success"} sx={{ mb: 2 }}>
                        {message}
                    </Alert>
                )}

                <Box component="form" noValidate sx={{ width: "100%", maxWidth: 400 }}>
                    <TextField fullWidth label="User Name" variant="outlined" margin="normal" onChange={nameChange} />
                    <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" onChange={passwordChange} />

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                        <Typography variant="body2" color="primary" sx={{ cursor: "pointer", fontWeight: "bold" }}>
                            Forgot password?
                        </Typography>
                    </Box>

                    <Button fullWidth variant="contained" sx={{ backgroundColor: "#6B4EFF", color: "white", mb: 2 }} onClick={clckSignIN}>
                        Sign in
                    </Button>

                    <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ mb: 2 }}>
                        Sign in with Google
                    </Button>

                    <Typography variant="body2" align="center" fontWeight="bold">
                        Don’t have an account?{" "}
                        <Link to="/register" style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "none" }}>
                            Sign up
                        </Link>
                    </Typography>
                    <Typography variant="body2" align="center" fontWeight="bold">
                        <Link to="/" style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "none",color: "red" }}>
                            Explore Without Login
                        </Link>
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", justifyContent: "center", flex: 1 }}>
                <Box component="img" src={illustration} alt="Illustration" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
        </Box>
    );
}