import React, { useState, useCallback, useEffect } from "react";
import { getCroppedImg } from "./utils";
import ImageDropzone from "./components/ImageDropzone";
import CropControls from "./components/CropControls";
import ImageCropper from "./components/ImageCropper";
import CropActions from "./components/CropActions";
import { loadFaceDetectionModels, detectFaces } from "./services/FaceDetectionService";

function App() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [facesDetected, setFacesDetected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [cropping, setCropping] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadFaceDetectionModels().then(() => setLoading(false));
  }, []);

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
      setDetecting(true);
      try {
        const result = await detectFaces(imgURL);
        if (result.detected) {
          const { dimensions } = result;
          setCrop({ x: dimensions.x, y: dimensions.y });
          setZoom(1.2);
          setAspect(1);
          setCroppedAreaPixels(dimensions);
        }
        setFacesDetected(result.detected);
      } catch (error) {
        console.error("Face detection failed:", error);
        setFacesDetected(false);
      } finally {
        setDetecting(false);
      }
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    if (!croppedAreaPixels) return;
    setCropping(true);
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    } finally {
      setCropping(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setCroppedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspect(1);
    setFacesDetected(null);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = "cropped-image.jpg";
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-200 h-screen justify-center">
      <h2 className="text-5xl font-semibold mb-3 flex items-center gap-4">
        Image Cropping Tool <span className="text-lg">(AI Assistance)</span>
      </h2>

      {loading && (
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p>Loading face detection model...</p>
        </div>
      )}

      {!image && !loading && <ImageDropzone onDrop={handleDrop} />}

      {detecting && (
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p>Detecting face...</p>
        </div>
      )}

      {image && <CropControls zoom={zoom} setZoom={setZoom} setAspect={setAspect} />}

      <div className="grid grid-cols-2 gap-5">
        {image && (
          <ImageCropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            setCrop={setCrop}
            setZoom={setZoom}
            onCropComplete={onCropComplete}
          />
        )}

        {image && (
          <CropActions
            onCrop={handleCropImage}
            onReset={handleReset}
            croppedImage={croppedImage}
            onDownload={handleDownload}
          />
        )}
      </div>

      {facesDetected !== null && !detecting && (
        <p className={`text-sm ${facesDetected ? "text-green-600" : "text-red-600"}`}>
          {facesDetected ? "Face detected! Auto-cropped." : ""}
        </p>
      )}
    </div>
  );
}

export default App;