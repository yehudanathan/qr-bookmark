import { Stack } from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import PictGenerator from "../components/PictGenerator";

const Register = () => {
    return (
        <>
        <Stack direction="row">
            <PictGenerator/>
            <RegisterForm/>
        </Stack>
        </>
    );
}

export default Register;