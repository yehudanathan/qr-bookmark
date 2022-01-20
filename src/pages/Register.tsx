import { Stack } from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import PictGenerator from "../components/PictGenerator";
import { useState } from "react";

const Register = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const toggleLoading = () => {setIsLoading(false); console.log("toggle!")};
    console.log(isLoading);

    return (
        <div className="body">
        <Stack direction="row" className="stack">
            <PictGenerator onGenerate={toggleLoading} />
            <RegisterForm isLoading={isLoading} />
        </Stack>
        </div>
    );
}

export default Register;