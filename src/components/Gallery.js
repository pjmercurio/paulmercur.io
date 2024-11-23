// src/components/Gallery.js
import React, { useState, useCallback, useEffect } from 'react';
import './Gallery.css';

const importAll = (r) => r.keys().map(r);
const thumbImages = importAll(require.context('../../public/images/gallery/thumbs', false, /\.(png|jpe?g|svg|jpg|JPG)$/));
const hiResImages = importAll(require.context('../../public/images/gallery/originals', false, /\.(png|jpe?g|svg|jpg|JPG)$/));

const ImageFrame = ({ hiResImageURL, onClick }) => {
    return (
        <div className='image-frame' id='photo' onClick={onClick}>
            <img
                alt='Gallery'
                src={hiResImageURL}
            />
        </div>
    );
};

const Loupe = () => {
    return (
        <div className="loupe" id="loupe"></div>
    );
};

const Gallery = ({ onMouseEnter, onMouseLeave }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loupeScaleFactor, setLoupeScaleFactor] = useState(2);

    // Add keydown listener for the 'm' key to open the loupe
    const handleKeyDown = useCallback((event) => {
        if (event.key === 'm') {
            const loupe = document.getElementById('loupe');
            const photo = document.getElementById('photo')?.firstChild
            if (!loupe || !selectedImage) return;

            loupe.style.backgroundImage = `url("${selectedImage}")`;
            loupe.style.display = loupe.style.display === 'block' ? 'none' : 'block';
            photo.style.cursor = loupe.style.display === 'block' ? 'none' : 'default';
        }
    }, [selectedImage]);

    const handleMouseMove = useCallback((e) => {
        const loupe = document.getElementById('loupe');
        const photo = document.getElementById('photo')?.firstChild;

        if (!loupe || loupe.style.display === 'none' || !photo) return;

        // Get the absolute position of the cursor
        const bounds = photo.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        // Centering the loupe on the cursor
        const loupeLeft = e.clientX - (loupe.offsetWidth / 2);
        const loupeTop = e.clientY - (loupe.offsetHeight / 2);
        loupe.style.left = `${loupeLeft}px`;
        loupe.style.top = `${loupeTop}px`;

        // Adjust the background size for magnification
        loupe.style.backgroundSize = `${bounds.width * loupeScaleFactor}px ${bounds.height * loupeScaleFactor}px`;

        // Adjust the background position for magnification
        const bgPosX = -((x * loupeScaleFactor) - (loupe.offsetWidth / 2));
        const bgPosY = -((y * loupeScaleFactor) - (loupe.offsetHeight / 2));
        loupe.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
    }, [loupeScaleFactor]);

    const handleScroll = useCallback((e) => {
        if (!selectedImage) return;
        setLoupeScaleFactor((prev) => {
            const delta = loupeScaleFactor / 50;
            return Math.max(1, prev + (e.deltaY > 0 ? -delta : delta));
        });
        handleMouseMove(e);
    }, [selectedImage, handleMouseMove, loupeScaleFactor]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('wheel', handleScroll);
        };
    }, [handleKeyDown, handleMouseMove, handleScroll]);

    return (
        <>
            <div className='gallery'>
                {/* <div className="center-block"></div> */}
                {thumbImages.map((thumbImage, index) => {
                    const regex = /\/([^/]+?)\./;
                    const imageName = thumbImage.match(regex)[1];
                    const hiResImage = hiResImages[index];

                    return (
                        <div key={index} className='gallery-item' onMouseEnter={(e) => onMouseEnter(e, imageName)} onMouseLeave={onMouseLeave} onClick={() => { setSelectedImage(hiResImage); }}>
                            <img src={thumbImage} alt={`Gallery item ${index}`} />
                        </div>
                    )
                })}
            </div>
            {selectedImage && <ImageFrame hiResImageURL={selectedImage} onClick={() => setSelectedImage(null)} />}
            {selectedImage && <Loupe />}
        </>
    );
};

export default Gallery;