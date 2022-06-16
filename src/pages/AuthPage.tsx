import { Stack } from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import SignInForm from "../components/SignInForm";
import PictGenerator from "../components/PictGenerator";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import LoadingPage from "../components/LoadingPage";

const AuthPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const toggleLoading = () => {setIsLoading(false)};
    const location = useLocation().pathname;

    if (location === '/register') {
        return (
            <div className="body">
            <Stack direction="row" className="stack">
                <div className="side-pic">
                    <PictGenerator onGenerate={toggleLoading} />
                </div>
                <RegisterForm isLoading={isLoading} />
            </Stack>
            </div>
        );
    } else if (location === '/signin') {
        return (
            <div className="body">
            <Stack direction="row" className="stack">
                <div className="side-pic">
                    <PictGenerator onGenerate={toggleLoading} />
                </div>
                <SignInForm isLoading={isLoading} />
            </Stack>
            </div>
        );
    } else {
        return <LoadingPage />;
    }
    
}

export default AuthPage;