import { Stack } from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import SignInForm from "../components/SignInForm";
import PictGenerator from "../components/PictGenerator";
import { useState } from "react";
import { useLocation } from 'react-router-dom';

const AuthPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const toggleLoading = () => {setIsLoading(false)};
    const location = useLocation().pathname;

    if (location === '/register') {
        return (
            <div className="body">
            <Stack direction="row" className="stack">
                <PictGenerator onGenerate={toggleLoading} />
                <RegisterForm isLoading={isLoading} />
            </Stack>
            </div>
        );
    } else if (location === '/signin') {
        return (
            <div className="body">
            <Stack direction="row" className="stack">
                <PictGenerator onGenerate={toggleLoading} />
                <SignInForm isLoading={isLoading} />
            </Stack>
            </div>
        );
    } else {
        return <>Not Found</>;
    }
    
}

export default AuthPage;