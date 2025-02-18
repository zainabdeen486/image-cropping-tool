import React from 'react';
import Cropper from 'react-easy-crop';

const ImageCropper = ({ image, crop, zoom, aspect, setCrop, setZoom, onCropComplete }) => (
    <div className="relative w-96 h-96 bg-gray-200">
        <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect"
            showGrid={true}
            restrictPosition={true}
        />
    </div>
);

export default ImageCropper;