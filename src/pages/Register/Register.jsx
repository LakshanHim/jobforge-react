import React, { useState, useEffect } from "react";
import { 
    TextField, Button, Typography, Box, IconButton, InputAdornment, Grid, CircularProgress, Backdrop 
} from "@mui/material";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import RegisterImage from "../../assets/regi.png";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const inputFirstName = (val) => setFirstName(val.target.value);
    const inputLastName = (val) => setLastName(val.target.value);
    const inputUsername = (val) => setUsername(val.target.value);
    const inputPassword = (val) => setPassword(val.target.value);

    const clickRegister = async () => {
        console.log(firstName)
        setLoading(true);

        const registerData = { "firstname": firstName, "lastname": lastName, "username": username, "password": password, "role": "USER" };

        try {
            const response = await fetch("http://localhost:8080/v1/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData),
            });

            if (response.ok) {
                setMessage("Your registration is successful!");
                setIsError(false);
                setFirstName("");
                setLastName("");
                setUsername("");   
                setPassword(""); 
            } else {
                setMessage("Registration failed. Try again.");
                setIsError(true);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("Something went wrong. Please try again.");
            setIsError(true);
        }

        setLoading(false);
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
            setMessage("");
        }, 3000);
    };

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid
                item xs={12} sm={6}
                sx={{
                    display: { xs: "none", sm: "block" },
                    backgroundImage: `url(${RegisterImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 4 }}>
                <Box sx={{ textAlign: "center", width: "100%", maxWidth: 400 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, fontSize: 30 }}>
                        Create an Account
                    </Typography>
                    <Box component="form" noValidate>
                        <TextField 
                            margin="normal" 
                            fullWidth 
                            label="First Name" 
                            variant="outlined" 
                            value={firstName} 
                            onChange={inputFirstName} 
                        />
                        <TextField 
                            margin="normal" 
                            fullWidth 
                            label="Last Name" 
                            variant="outlined" 
                            value={lastName} 
                            onChange={inputLastName} 
                        />
                        <TextField 
                            margin="normal" 
                            fullWidth 
                            label="Username" 
                            variant="outlined" 
                            value={username} 
                            onChange={inputUsername} 
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            value={password}
                            onChange={inputPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button 
                            fullWidth 
                            variant="contained" 
                            onClick={clickRegister} 
                            sx={{ backgroundColor: "#6B4EFF", color: "white", mb: 2, fontWeight: "bold" }}
                            disabled={loading}
                        >
                            Register
                        </Button>

                        <Typography variant="body2" align="center">
                            Already have an account?{" "}
                            <Link to="/login" style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "none", color: "#6B4EFF" }}>
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Grid>

            <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {showMessage && (
                <Box 
                    sx={{
                        position: "fixed", 
                        top: "50%", 
                        left: "50%", 
                        transform: "translate(-50%, -50%)", 
                        backgroundColor: isError ? "#ff5252" : "#4CAF50", 
                        color: "white", 
                        padding: "16px 32px", 
                        borderRadius: "8px", 
                        zIndex: 9999,
                        textAlign: "center",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
                    }}
                >
                    {message}
                </Box>
            )}
        </Grid>
    );
}
