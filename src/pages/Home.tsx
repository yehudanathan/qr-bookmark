import AddLink from "../components/AddLink";
import QRScanner from "../components/QRScanner";
import { Stack } from "@mui/material";
import "../index.scss";
import TemporaryDrawer from "../components/SideBar";
import CustomSnackBar from "../components/CustomSnackBar";
import Profile from "../components/Profile";

const Home = () => {
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
            <CustomSnackBar severity="success" message="You have successfully logged in!" autoHide={6000} open={true}/>
            {/* how to set such that the snackbar only opens when first time logging in? */}
            <div className="copyright">
                <p className="copyright-text">Copyright here</p>
            </div>
        </div>
    )
}

export default Home;
