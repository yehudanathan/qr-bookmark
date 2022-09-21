import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router";
import QrReader from "react-qr-scanner";
import TitleDialog from "./TitleDialog";
import validator from "validator";

const QrScanner = ({ open, setOpen }) => {
    const location = useLocation();
    const [result, setResult] = useState('No result');
    const [showTitleDialog, setShowTitleDialog] = useState(false);

    const previewStyle = {
        height: "300px",
        width: "400px",
        borderRadius: "5px",
    }

    const handleScan = (e) => {
        const text: string = e === null ? 'No result' : e.text;
        if (validator.isURL(text)) {
            setResult(text);
            alert("Scanner result: " + text);
            setOpen(false);
            setShowTitleDialog(true);
        }
    }

    const handleError = (e) => {
        console.error(e);
    }

    const QrReaderDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={() => { setOpen(false); }}
            >
                <Stack alignItems="center" sx={{ paddingBottom: "16px" }}>
                    <DialogTitle>
                        <h1>Scan QR Code</h1>
                    </DialogTitle>
                    <DialogContent sx={{ paddingBottom: "3px" }}>
                        <QrReader
                            style={previewStyle}
                            onScan={handleScan}
                            onError={handleError}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ height: "48px", fontFamily: "Montserrat", }}
                            onClick={() => setOpen(false)}
                            type="submit"
                            color={location.pathname === '/links' ? 'primary' : "secondary"}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Stack>
            </Dialog>
        );
    }

    return (
        <>
            <TitleDialog open={showTitleDialog} handleClose={() => setShowTitleDialog(false)} URL={result} />
            {QrReaderDialog()}
        </>
    )
}

export default QrScanner;