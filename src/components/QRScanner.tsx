import { useState } from "react";
import QrReader from "react-qr-scanner";
import validator from "validator";
import { Button } from "@mui/material";

const QRScanner = () => {
    const [result, setResult] = useState('No result');
    const [showQrReader, setShowQrReader] = useState(false);

    const previewStyle = {
        height: 400,
        width: 400,
    }

    const handleScan = (e) => {
        const text: string = e === null ? 'No result' : e.text;
        if (validator.isURL(text)) {
            setResult(text);
            alert("Scanner result: " + result);
        }
    }

    const handleError = (e) => {
        console.error(e);
    }

    return (
        <>
        <Button
            style={{backgroundColor: "#7c40a9"}} //TODO bikin toggle color for button
            variant = "contained"
            size= "large"
            sx={{height:"48px", fontFamily: "Montserrat",}}
            onClick={() => setShowQrReader(!showQrReader)}
            type="submit"
            >
            {showQrReader ? "Close" : "Open Camera"}
        </Button>
        
        {showQrReader && <QrReader
            style={previewStyle}
            onScan={handleScan}
            onError={handleError}
        />}  
        </>
    )
}

export default QRScanner;