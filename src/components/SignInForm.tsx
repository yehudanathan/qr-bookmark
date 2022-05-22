import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogin } from '../apis/auth';
import users from "../data/users.json";

const SignInForm = ({ isLoading }) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const findUser = users["registered-users"].find(user => user.email === email) || "{}"
        const name = findUser["name"];
        const userID = findUser["userID"];
        console.log(name);
        const user = {userID, name, email, password};
        const response = await authLogin(user);

        if (response === "Cannot find user") {
            setEmailError("We could not find an account associated with this email.");
            setPasswordError("");
            setPassword("");
        } else if (response === "Incorrect password") {
            // alert("Incorrect password");
            setPassword("");
            setPasswordError("Incorrect password.");
            setEmailError("");
        } else if (response === "Password is too short") {
            setPassword("");
            setPasswordError("Password must be at least 4 characters.");
            setEmailError("");
        } else if (response === "Logged in") {
            navigate('/');
            console.log("check!");
        }
    }

    if (isLoading) {
        return (<></>);
    } else {
        return ( <>
            <form className="form-control" onSubmit={handleSubmit}>
                <Stack alignItems="center" spacing={3}>
                    <Stack alignItems="center">
                        <h1 className="subtitle"><strong>Sign in to your account.</strong></h1> 
                        {!emailError? <TextField
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
                            /> : 
                            <Stack>
                                <TextField
                                className="error-text-field"
                                required
                                error
                                label="Email"
                                helperText={emailError}
                                sx={{m: 1, width: "50ch", backgroundColor: "white",
                                borderTopLeftRadius: "4px",
                                borderTopRightRadius: "4px",
                                }}
                                size="small"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                inputProps={{style: {fontFamily: "Product Sans"}}}
                                />
                                <div className="blank"></div>
                            </Stack>
                            }
                        {!passwordError ? <TextField
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
                            /> : 
                            <TextField
                            error
                            className="error-text-field"
                            helperText={passwordError}
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
                            />
                            }
                    </Stack>
                    <Button
                        style={{backgroundColor: "#019875"}}
                        variant = "contained"
                        size= "large"
                        sx={{height:"40px",
                            fontFamily:"Montserrat"}}
                        type="submit"
                        >
                        Sign In
                    </Button>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <h3 className="header-3">Don't have an account?</h3>
                        <a href="/register" className="link">Register.</a>
                    </Stack>
                </Stack>
            </form>
            </>
        )
    }
}

export default SignInForm;
