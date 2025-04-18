
import { pipeline } from "@huggingface/transformers";

// Types for YOLOv8 detection results
export interface DetectionBox {
  box: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
  label: string;
  score: number;
}

export interface YoloDetectionResult {
  detections: DetectionBox[];
  timestamp: number;
}

let objectDetector: any = null;

// Initialize the YOLOv8 model from Hugging Face
export const initYoloDetector = async (): Promise<boolean> => {
  try {
    if (!objectDetector) {
      console.log("Initializing YOLOv8 detector...");
      objectDetector = await pipeline(
        "object-detection",
        "keremberke/yolov8n-brawl-stars",
        { device: "cpu" } // Use WebGPU if available: { device: "webgpu" }
      );
      console.log("YOLOv8 detector initialized successfully");
    }
    return true;
  } catch (error) {
    console.error("Failed to initialize YOLOv8 detector:", error);
    return false;
  }
};

// Detect Brawl Stars characters in an image
export const detectBrawlers = async (
  imageSource: HTMLImageElement | string
): Promise<DetectionBox[]> => {
  if (!objectDetector) {
    const initialized = await initYoloDetector();
    if (!initialized) {
      throw new Error("Failed to initialize YOLOv8 detector");
    }
  }

  try {
    console.log("Running detection on image...");
    const result = await objectDetector(imageSource);
    console.log("Detection result:", result);
    return result;
  } catch (error) {
    console.error("YOLOv8 detection error:", error);
    throw error;
  }
};

// Process video frames for detection
export const processVideoFrame = async (
  videoElement: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  timestamp: number
): Promise<YoloDetectionResult> => {
  // Draw the current frame on a canvas
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
  // Get the image data as a blob
  const dataUrl = canvas.toDataURL("image/jpeg");
  
  // Detect objects in the frame
  const detections = await detectBrawlers(dataUrl);
  
  return {
    detections,
    timestamp
  };
};
