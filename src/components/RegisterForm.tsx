import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react'

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

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
            console.log("registered!");
        }
    }

    return (
        <>
        <form className="form-control" onSubmit={handleSubmit}>
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
                    color="secondary"
                    inputProps={{style: {fontFamily: "Product Sans"}}}
                    />
                <TextField
                    required
                    label="Email"
                    sx={{m: 1, width: "50ch", backgroundColor: "white",
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                    }}
                    size="small"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    color="secondary"
                    inputProps={{style: {fontFamily: "Product Sans"}}}
                    />
                <TextField
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
                    color="secondary"
                    inputProps={{style: {fontFamily: "Product Sans"}}}
                    />
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
                    color="secondary"
                    inputProps={{style: {fontFamily: "Product Sans"}}}
                    />
                <Button
                    style={{backgroundColor: "#7c40a9"}}
                    variant = "contained"
                    size= "large"
                    sx={{height:"40px",
                        fontFamily:"Montserrat"}}
                    type="submit"
                    >
                    Register
                </Button>
            </Stack>
        </form>
        </>
    )
}

export default RegisterForm;
