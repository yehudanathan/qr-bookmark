import { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "./LoadingPage";

const PictGenerator = ({ onGenerate }) => {
    const baseUnsplashURL = "https://api.unsplash.com/photos/random?client_id=CNqJperIJlMcgWD2L7jzmRD7VfA5_QcVMXpv3ELsZ-Y&orientation=landscape";
    const [photo, setPhotoAs] = useState<any>(null);

    const setPhoto = async () => {
        const result = await axios.get(baseUnsplashURL);
        setPhotoAs(result);
        onGenerate();
    }

    useEffect(() => {
        setPhoto();
    });

    if (photo === null) {
        return <LoadingPage/>;
    } else {
        return (
            <a
                className="credit"
                target="_blank"
                href={`https://unsplash.com/@${photo.data.user.username}`}
            >
                <img className="img" src={photo.data.urls.regular} alt="background"/>
            </a>
        );
    }
}

export default PictGenerator;
