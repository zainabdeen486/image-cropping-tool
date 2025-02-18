import React from 'react';
import Dropzone from 'react-dropzone';

const ImageDropzone = ({ onDrop }) => (
    <Dropzone onDrop={onDrop} accept={{ 'image/*': ['.png', '.jpg'] }}>
        {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-10 text-center cursor-pointer rounded-lg w-96 h-40 flex items-center justify-center">
                <input {...getInputProps()} />
                <p>Drag & Drop an image here, or click to select one</p>
            </div>
        )}
    </Dropzone>
);

export default ImageDropzone;