import AddLink from "../components/AddLink";
import QRScanner from "../components/QRScanner";
import { Stack } from "@mui/material";

const Home = () => {
    return (
        <Stack direction="column" spacing={0} alignItems="center">
            <AddLink/>
            <QRScanner/>
        </Stack>
    )
}

export default Home;
