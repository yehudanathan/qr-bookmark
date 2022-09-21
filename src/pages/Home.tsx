import AddLinkComponent from "../components/AddLinkComponent";
import QrScanner from "../components/QrScanner";
import TemporaryDrawer from "../components/SideBar";
import CustomSnackBar from "../components/CustomSnackBar";
import Profile from "../components/Profile";
import MetaTags from "react-meta-tags";
import { Stack, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useState } from "react";
import "../index.scss";

const Home = () => {
    const [openQrReader, setOpenQrReader] = useState(false);
    const location = useLocation();

    const checkPreviousLocation = () => {
        if (location.state !== null) {
            return true;
        }
        return false;
    }

    return (
        <div className="body home">
            <MetaTags>
                <title>QR-Bookmark</title>
                <meta name="description" content="A web app to manage and scan QR bookmarks." />
                <meta property="og:title" content="QR-Bookmark" />
            </MetaTags>
            <Helmet>
                <link id="homeIcon" rel="icon" sizes="16x16" />
            </Helmet>
            <Stack direction="row" justifyContent="space-between">
                <TemporaryDrawer />
                <Profile />
            </Stack>
            <Stack direction="column" spacing={1} alignItems="center">
                <h1 className="title">Quick add bookmarks...</h1>
                <AddLinkComponent />
                <Button
                    style={{ backgroundColor: "#7c40a9" }} //TODO bikin toggle color for button
                    variant="contained"
                    size="large"
                    sx={{ height: "48px", fontFamily: "Montserrat", }}
                    onClick={() => { setOpenQrReader(true) }}
                    type="submit"
                >
                    {"Open Camera"}
                </Button>
                <QrScanner open={openQrReader} setOpen={setOpenQrReader} />
            </Stack>
            <CustomSnackBar severity="success" message="You have successfully logged in!" autoHide={6000} open={checkPreviousLocation} />
            {/* how to set such that the snackbar only opens when first time logging in? */}
            {/* locate previous page, pake useHistory() https://reactrouter.com/docs/en/v6/routers/history-router */}
        </div>
    )
}

export default Home;
