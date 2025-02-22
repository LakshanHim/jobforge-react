import React, { useState } from "react";
import { Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, MenuItem, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../assets/logo.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function Company() {
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={logo} alt="JobForge Company Logo" style={{ height: 50, marginRight: 10 }} />
                        <Typography variant="h6" color="black" fontWeight="bold">
                            JobForge
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 3, flexDirection: 'column' }}>
                <Typography variant="h4" color="black" fontWeight="bold" textAlign="center">
                    Get started with Rooster
                </Typography>
                <Typography variant="h6" color="black" textAlign="center" marginTop="10px">
                    Hire and manage all your employees from one single platfrom
                </Typography>


                <Card sx={{ width: '100%', marginTop: 3, padding: 3, boxShadow: 'none' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField fullWidth label="First name" margin="normal" variant="outlined" />
                            <TextField fullWidth label="Last name" margin="normal" variant="outlined" />
                        </Box>
                        <TextField fullWidth label="Work email address" margin="normal" variant="outlined" />
                        <PhoneInput

                            defaultCountry="LK"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            style={{ width: '100%', marginTop: '16px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <TextField fullWidth label="Company name" margin="normal" variant="outlined" />
                        <TextField
                            fullWidth
                            label="Set your password"
                            margin="normal"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Typography variant="h6" color="black" textAlign="center" margin="10px" fontSize="15px" sx={{ opacity: 0.5 }}>
                            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                        </Typography>
                        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                            Sign Up
                        </Button>
                    </CardContent>
                    <Typography variant="h6" color="black" textAlign="center" margin="10px" fontSize="15px" >
                        Already using Rooster?
                        <Link to="/login" style={{ textDecoration: "none", color: 'red' }}>
                            Sign in here
                        </Link>

                    </Typography>
                    <Typography variant="h6" color="black" textAlign="center" margin="10px" fontSize="15px" sx={{ opacity: 0.5 }}>
                        By creating an account, you agree to the terms & conditions and our privacy policy.
                    </Typography>

                </Card>
            </Container>

        </>
    );
}

