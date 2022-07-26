import RegisterForm from "../components/RegisterForm";
import SignInForm from "../components/SignInForm";
import LoadingPage from "../components/LoadingPage";
import PictGenerator from "../components/PictGenerator";
import MetaTags from 'react-meta-tags';
import { Stack } from "@mui/material";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AuthPage = () => {
    const location = useLocation().pathname;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const toggleLoading = () => {setIsLoading(false)};

    if (location === '/register') {
        return (
            <div className="body">
                <MetaTags>
                    <title>Register</title>
                    <meta name="description" content="Register to QR-Bookmark now." />
                    <meta property="og:title" content="Register" />
                </MetaTags>
                <Helmet>
                    <link id="registerIcon" rel="icon" sizes="16x16"/>
                </Helmet>
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
                <MetaTags>
                    <title>Sign In</title>
                    <meta name="description" content="Sign in to QR-Bookmark" />
                    <meta property="og:title" content="Sign In" />
                </MetaTags>
                <Helmet>
                    <link id="signInIcon" rel="icon" sizes="16x16"/>
                </Helmet>
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