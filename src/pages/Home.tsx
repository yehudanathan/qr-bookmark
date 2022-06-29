import AddLink from "../components/AddLink";
import QRScanner from "../components/QRScanner";
import TemporaryDrawer from "../components/SideBar";
import CustomSnackBar from "../components/CustomSnackBar";
import Profile from "../components/Profile";
import MetaTags from "react-meta-tags";
import { Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';
import "../index.scss";

const Home = () => {
    const location = useLocation();
    const checkPreviousLocation = () => {
        console.log(location.state);
        if (location.state !== null) {
            return true;
        }
        return false;
    }

    // console.log("rendering home");
    return (
        <div className="body home">
            <MetaTags>
                <title>QR-Bookmark</title>
                <meta name="description" content="A web app to manage and scan QR bookmarks." />
                <meta property="og:title" content="QR-Bookmark" />
            </MetaTags>
            <Helmet>
                <link id="homeIcon" rel="icon" sizes="16x16"/>
            </Helmet>
            <Stack direction="row" justifyContent="space-between">
                <TemporaryDrawer/>
                <Profile/>
            </Stack>
            <Stack direction="column" spacing={1} alignItems="center">
                <h1 className="title">Bookmark your link now.</h1>
                <AddLink/>
                <QRScanner/>
            </Stack>
            <CustomSnackBar severity="success" message="You have successfully logged in!" autoHide={6000} open={checkPreviousLocation}/>
            {/* how to set such that the snackbar only opens when first time logging in? */}
            {/* locate previous page, pake useHistory() https://reactrouter.com/docs/en/v6/routers/history-router */}
        </div>
    )
}

export default Home;
