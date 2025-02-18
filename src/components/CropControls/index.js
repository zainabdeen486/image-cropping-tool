import React from 'react';

const CropControls = ({ zoom, setZoom, setAspect }) => (
    <div className="w-64">
        <div className="w-full">
            <h2>Zoom</h2>
            <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                className="mt-2 w-full"
            />
        </div>
        <div className="w-full mt-4">
            <h2>Aspect</h2>
            <select
                onChange={(e) => setAspect(e.target.value === "free" ? null : parseFloat(e.target.value))}
                className="mt-2 w-full border p-2 rounded focus-within:outline-none"
            >
                <option value="free">Free Aspect</option>
                <option value="1">1:1</option>
                <option value="4/5">4:5</option>
                <option value="16/9">16:9</option>
            </select>
        </div>
    </div>
);

export default CropControls;