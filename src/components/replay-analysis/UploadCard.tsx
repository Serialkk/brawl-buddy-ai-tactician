
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, EyeIcon } from "lucide-react";
import { toast } from "sonner";

interface UploadCardProps {
  onFileSelect: (file: File) => void;
}

export function UploadCard({ onFileSelect }: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check file type and size
    const validTypes = ['video/mp4', 'video/webm', 'application/json', 'image/jpeg', 'image/png']; // Added image formats
    const maxSize = 1024 * 1024 * 1024; // 1GB max
    
    if (!validTypes.includes(file.type)) {
      toast.error("Ungültiges Dateiformat. Bitte MP4, WEBM, PNG, JPEG oder JSON-Datei hochladen.");
      e.target.value = '';
      return;
    }
    
    if (file.size > maxSize) {
      toast.error("Die Datei ist zu groß. Maximale Größe: 1GB");
      e.target.value = '';
      return;
    }
    
    // Pass the file to parent
    onFileSelect(file);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelect({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div 
      className="brawl-card p-8 max-w-md mx-auto border-2 border-dashed border-muted rounded-lg 
        transition-all duration-300 hover:border-brawl-blue hover:scale-[1.01] hover:shadow-lg
        animate-fade-in"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 animate-float">
          <Upload className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-2 font-lilita">Upload Replay</h3>
        <p className="text-muted-foreground mb-2">
          Drag and drop your replay file or click to browse
        </p>
        <p className="text-sm text-brawl-blue mb-6 animate-pulse">
          <EyeIcon className="inline h-4 w-4 mr-1" /> YOLOv8 Objekt-Erkennung aktiviert
        </p>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".mp4,.webm,.json,.jpg,.jpeg,.png"
        />
        <Button 
          onClick={() => fileInputRef.current?.click()} 
          className="brawl-button brawl-button-primary transition-transform hover:scale-105"
        >
          <Upload className="mr-2 h-4 w-4" /> Select Replay
        </Button>
      </div>
    </div>
  );
}
