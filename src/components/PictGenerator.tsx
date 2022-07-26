import { useState, useEffect } from "react";
import axios from "axios";

const PictGenerator = ({ onGenerate }) => {
    const baseUnsplashURL = "https://api.unsplash.com/photos/random?client_id=CNqJperIJlMcgWD2L7jzmRD7VfA5_QcVMXpv3ELsZ-Y&orientation=landscape";
    const [photo, setPhotoAs] = useState<any>(null);
    const [photoError, setPhotoError] = useState<boolean>(false);

    const setPhoto = async () => {
        try {
            const result = await axios.get(baseUnsplashURL);
            setPhotoAs(result);
            onGenerate();
        } catch (error) {
            setPhotoError(true);
            onGenerate();
        }
    }

    useEffect(() => {
        setPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if (photoError) {
        return <img className="img" src="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg" alt="background" />;
    } else if (photo === null) {
        return <></>; 
        // TODO create error page
    } else {
        return (
            <a
                className="credit"
                target="_blank"
                href={`https://unsplash.com/@${photo.data.user.username}`} rel="noreferrer"
            >
                <img className="img" src={photo.data.urls.regular} alt="background"/>
            </a>
        );
    }
}

export default PictGenerator;
