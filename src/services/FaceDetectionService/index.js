import * as faceapi from 'face-api.js';

export const loadFaceDetectionModels = async () => {
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models/tinyFaceDetector");
    } catch (error) {
        console.error("Error loading face models:", error);
    }
};

export const detectFaces = async (imgURL) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imgURL;
        img.onload = async () => {
            try {
                const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
                if (detections.length > 0) {
                    const box = detections[0].box;
                    const centerX = box.x + box.width / 2;
                    const centerY = box.y + box.height / 2;
                    const cropSize = Math.max(box.width, box.height) * 1.2;
                    const cropX = centerX - cropSize / 2;
                    const cropY = centerY - cropSize / 2;

                    resolve({
                        dimensions: {
                            x: cropX,
                            y: cropY,
                            width: cropSize,
                            height: cropSize
                        },
                        detected: true
                    });
                } else {
                    resolve({ detected: false });
                }
            } catch (error) {
                reject(error);
            }
        };
        img.onerror = () => reject(new Error("Error loading image"));
    });
};