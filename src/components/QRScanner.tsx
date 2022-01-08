import { useState, useRef } from "react";
import QrReader from "react-qr-scanner";
import validator from "validator";
import { Button } from "@mui/material";
import DetectRTC from "detectrtc";

const QRScanner = () => {
    const [result, setResult] = useState('No result');
    const [showQrReader, setShowQrReader] = useState(false);
    const ref = useRef<QrReader>(null);

    const previewStyle = {
        height: 400,
        width: 400,
    }

    const handleScan = (e: any) => {
        const text: string = e === null ? 'No result' : e.text;
        if (validator.isURL(text)) {
            setResult(text);
            alert("Scanner result: " + result);
        }
    }

    const handleError = (e: Error) => {
        console.error(e);
    }

    const QRReader = (<QrReader
        ref={ref}
        style={previewStyle}
        onScan={handleScan}
        onError={handleError}
        legacyMode={DetectRTC.hasWebcam ? false : true}
        />);

    const openImageDialog = () => {
        ref?.current?.openImageDialog();
    }

    return (
        <>
            <Button
                variant = "text"
                size= "large"
                sx={{height:"40px"}}
                onClick={() => setShowQrReader(!showQrReader)}
                type="submit"
                >
                {showQrReader ? "Close" : "Open Camera"}
            </Button>
            {showQrReader && QRReader} 
        </>
    )
}

export default QRScanner;