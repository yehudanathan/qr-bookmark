import { Button, Stack, TextField, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRegister } from '../apis/auth';

const RegisterForm = ({ isLoading }) => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async (e: any) => {
        const emptyName = name === "";
        const emptyEmail = email === "";
        const emptyPass = password === "";
        const passNotMatch = password !== confPassword;
        if (emptyName) {
            e.preventDefault();
            alert("Please enter a valid name");
        } else if (emptyEmail) {
            e.preventDefault();
            alert("Please enter a valid email"); //TODO check whether the email is valid
        } else if (emptyPass) {
            e.preventDefault();
            alert("Please enter a password"); //TODO build a scheme for a password (strong, medium, weak)
        } else if (passNotMatch) {
            e.preventDefault();
            alert("Passwords do not match");
        } else {
            e.preventDefault();
            const user = {name, email, password};
            const response = await authRegister(user);
            // console.log(response);

            if (response === "Registered") {
                alert("User registered successfully");
                navigate('/'); // this will navigate to signin first, redirects user to signin (again) after registering.
            }
            if (response === "Email already exists") {
                setEmailError("Email is already in use.");
                setPasswordError("");
            }
            if (response === "Password is too short") {
                setEmailError("");
                setPasswordError("Password must be at least 4 characters.");
            }
        }
    }
    if (isLoading) {
        return (<></>);
    } else {
        return ( <>
            <form className="form-control" onSubmit={handleSubmit}>
                <Stack alignItems="center" spacing={3}>
                    <Stack alignItems="center">
                        <h1 className="subtitle"><strong>Register now. </strong>  It's free.</h1> 
                        <TextField
                            required
                            label="Name"
                            sx={{m: 1, width: "50ch", backgroundColor: "white",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                            }}
                            size="small"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            color="success"
                            inputProps={{style: {fontFamily: "Product Sans"}}}
                            />
                        { !emailError? <TextField
                            required
                            label="Email"
                            sx={{m: 1, width: "50ch", backgroundColor: "white",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                            }}
                            size="small"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            color="success"
                            inputProps={{style: {fontFamily: "Product Sans"}}}
                            /> : <Stack> 
                                <TextField
                            className="error-text-field"
                            error
                            required
                            helperText={emailError}
                            label="Email"
                            sx={{m: 1, width: "50ch",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                            display: "flex",
                            }}
                            size="small"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            inputProps={{style: {fontFamily: "Product Sans"}}}
                            />
                            <div className="blank"></div>
                            </Stack>
                                }
                        { !passwordError? <TextField
                            required
                            type="password"
                            label="Password"
                            sx={{m: 1, width: "50ch", backgroundColor: "white",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                            }}
                            size="small"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            color="success"
                            inputProps={{style: {fontFamily: "Product Sans"}}}
                            /> : <Stack> 
                                <TextField
                            className="error-text-field"
                            error
                            type="password"
                            required
                            helperText={passwordError}
                            label="Password"
                            sx={{m: 1, width: "50ch",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                            display: "flex",
                            }}
                            size="small"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            inputProps={{style: {fontFamily: "Product Sans"}}}
                            />
                            <div className="blank"></div>
                            </Stack>
                            }
                        <TextField
                            required
                            type="password"
                            label="Confirm Password"
                            sx={{m: 1, width: "50ch", backgroundColor: "white",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                            }}
                            size="small"
                            value={confPassword}
                            onChange={e => setConfPassword(e.target.value)}
                            color="success"
                            inputProps={{style: {fontFamily: "Product Sans"}}}
                            />
                    </Stack>
                    <Stack direction="row" spacing={4} alignItems="center">
                        <Button
                            style={{backgroundColor: "#019875"}}
                            variant = "contained"
                            size= "large"
                            sx={{height:"40px",
                                fontFamily:"Montserrat"}}
                            type="submit"
                            >
                            Register
                        </Button>
                        <Button
                            style={{backgroundColor: "#019875"}}
                            variant = "contained"
                            size= "large"
                            sx={{height:"40px",
                                fontFamily:"Montserrat",
                                width:"123.5px"}}
                            onClick={() => navigate('/signin')}
                            >
                            Sign In
                        </Button>
                    </Stack>
                </Stack>
            </form>
            </>
        )
    }
}

export default RegisterForm;
