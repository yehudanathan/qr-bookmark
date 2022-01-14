import AddLink from "../components/AddLink";
import QRScanner from "../components/QRScanner";
import { Stack } from "@mui/material";
import "../index.scss";
import TemporaryDrawer from "../components/SideBar";

const Home = () => {
    return (
        <div className="body">
            <TemporaryDrawer/>
            <Stack direction="column" spacing={1} alignItems="center">
                <AddLink/>
                <QRScanner/>
            </Stack>
        </div>
    )
}

export default Home;
