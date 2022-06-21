import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
// import { authLogin } from '../apis/auth';
// import users from "../data/users.json";
import { emailSignIn } from '../firebase/auth/auth_email_password';
import { googleSignIn } from '../firebase/auth/auth_google';
import VerificationEmailModal from './VerificationEmailModal';

const SignInForm = ({ isLoading }) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const errorCodes = {
        "email" : {
            "auth/invalid-email" : "Invalid email address.",
            "auth/user-not-found" : "We could not find an account associated with this email.",
            "auth/user-disabled" : "This account is currently disabled.",
            "auth/unverified-email" : "Please make sure that your email has been verified."
        },
        "password" : {
            "auth/wrong-password" : "Incorrect password.",
        }
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");

        // PART FOR MOCK DATA
        // uncomment this part if backend is not available

        // const findUser = users["registered-users"].find(user => user.email === email) || "{}"
        // const name = findUser["name"];
        // const userID = findUser["userID"];
        // const user = {userID, name, email, password};
        // const response = await authLogin(user);

        // if (response === "Cannot find user") {
        //     setEmailError("We could not find an account associated with this email.");
        //     setPasswordError("");
        //     setPassword("");
        // } else if (response === "Incorrect password") {
        //     // alert("Incorrect password");
        //     setPassword("");
        //     setPasswordError("Incorrect password.");
        //     setEmailError("");
        // } else if (response === "Password is too short") {
        //     setPassword("");
        //     setPasswordError("Password must be at least 4 characters.");
        //     setEmailError("");
        // } else if (response === "Logged in") {
        //     navigate('/', { state : { user } });
        //     console.log("check!");
        // }

        const response = await emailSignIn(email, password);
        console.log(response);

        if (typeof response === "string") {
            if (response === Object.keys(errorCodes["password"])[0]) {
                setPasswordError(errorCodes["password"][response]);
                setPassword("");
            } else {
                setEmailError(errorCodes["email"][response]);
                setPassword("");
            }
        } else {
            console.log("login success");
            navigate('/', { state : response });
            console.log("check!");
        }
    }

    const handleGoogleSignIn = () => {
        console.log("google sign in");
        googleSignIn();
    }

    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => {
        setOpenModal(false);
      }

    if (isLoading) {
        return (<></>);
    } else {
        return ( 
        <>
        <VerificationEmailModal openState={openModal} handleCloseModal={handleCloseModal} />
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

                <Stack direction="row" spacing={3} style={{marginTop: "12px"}}>
                    <GoogleButton style={{borderRadius: "2%"}} onClick={handleGoogleSignIn}/>
                    <Button
                        style={{backgroundColor: "#019875", borderRadius: "2%"}}
                        variant = "contained"
                        size= "large"
                        sx={{height:"50px",
                            fontFamily:"Montserrat"}}
                        type="submit"
                        >
                        Sign In
                    </Button>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={0.5} style={{marginTop: "10px"}}>
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
