import AddLink from "../components/AddLink";
import QRScanner from "../components/QRScanner";
import { Stack } from "@mui/material";
import "../index.scss";

const Home = () => {
    return (
        <div className="body">
            <Stack direction="column" spacing={1} alignItems="center">
                <h1 className="title">Bookmark your link now.</h1>
                <AddLink/>
                <QRScanner/>
            </Stack>
        </div>
    )
}

export default Home;
