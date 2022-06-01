import AddLink from "../components/AddLink";
import QRScanner from "../components/QRScanner";
import { Stack } from "@mui/material";
import "../index.scss";
import TemporaryDrawer from "../components/SideBar";
import CustomSnackBar from "../components/CustomSnackBar";
import Profile from "../components/Profile";
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const checkPreviousLocation = () => {
        if (location.state !== null) {
            return true;
        }
        return false;
    }

    return (
        <div className="body home">
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
