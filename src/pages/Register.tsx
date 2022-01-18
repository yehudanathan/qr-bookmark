import { Stack } from "@mui/material";
import { authRegister } from "../apis/auth";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
    return (
        <>
        <Stack direction="row">
            {/* picture here */}
            <RegisterForm/>
        </Stack>
        </>
    )
}

export default Register;