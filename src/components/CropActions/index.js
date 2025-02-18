import React from 'react';

const CropActions = ({ onCrop, onReset, croppedImage, onDownload }) => (
    <div>
        <div className="flex space-x-4">
            <button onClick={onCrop} className="mt-4">Crop Image</button>
            <button onClick={onReset} className="mt-4 bg-red-500 px-5 py-2 text-white">Reset</button>
        </div>
        {croppedImage && (
            <div className="mt-4">
                <img src={croppedImage} alt="Cropped" className="w-40 h-40 object-cover border border-gray-300" />
                <button onClick={onDownload} className="mt-2">Download</button>
            </div>
        )}
    </div>
);

export default CropActions;