import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailSignUp, sendEmailVerification } from '../firebase/auth/auth_email_password';
import { logOut, updateUser } from '../firebase/auth/auth_user';

const RegisterForm = ({ isLoading }) => {
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confPasswordError, setConfPasswordError] = useState("");

    const errorCodes = {
        "email" : {
            "auth/email-already-in-use": "Email is already in use.",
            "auth/invalid-email": "Invalid email.",
            "auth/user-not-found": "There is no user with corresponding email.",
            "auth/user-disabled": "User is currently disabled.",
        },
        "password" : {
            "auth/weak-password": "Password must be at least 6 characters.",
        }
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        setConfPasswordError("");

        const passNotMatch = password !== confPassword;

        //TODO build a scheme for a password (strong, medium, weak)
        
        if (passNotMatch) {
            setConfPasswordError("Passwords do not match.");
        } else {
            const response = await emailSignUp(email, password);
            const profile = {
                displayName: name,
                photoURL: undefined,
            }
            
            if (typeof response === "string") {
                if (response === Object.keys(errorCodes["password"])[0]) {
                    setPasswordError(errorCodes["password"][response]);
                } else {
                    setEmailError(errorCodes["email"][response]);
                }
            } else {
                updateUser(profile, () => {
                    sendEmailVerification(() => {
                        logOut();
                        navigate('/signin', { state: profile });
                        // this will redirect to /signin first, 
                        // asking user to signin again after registering (and have their email verified).
                    });
                });
            }
        }
    }
    if (isLoading) {
        return (<></>);
    } return ( 
        <>
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
                    {!confPasswordError ? <TextField
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
                        /> : <Stack> 
                        <TextField
                        className="error-text-field"
                        error
                        type="password"
                        required
                        helperText={confPasswordError}
                        label="Confirm Password"
                        sx={{m: 1, width: "50ch",
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                        display: "flex",
                        }}
                        size="small"
                        value={confPassword}
                        onChange={e => setConfPassword(e.target.value)}
                        inputProps={{style: {fontFamily: "Product Sans"}}}
                        />
                        <div className="blank"></div>
                    </Stack>}
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

export default RegisterForm;
