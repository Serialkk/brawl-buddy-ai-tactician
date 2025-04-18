
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Upload, X } from "lucide-react";

interface ProgressCardProps {
  uploadStatus: 'uploading' | 'analyzing';
  progress: number;
  onCancel: () => void;
}

export function ProgressCard({ uploadStatus, progress, onCancel }: ProgressCardProps) {
  return (
    <div className="brawl-card p-8 max-w-md mx-auto animate-fade-in">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 animate-float">
          {uploadStatus === 'uploading' ? (
            <Upload className="h-10 w-10 text-muted-foreground animate-bounce" />
          ) : (
            <Play className="h-10 w-10 text-brawl-blue animate-pulse" />
          )}
        </div>
        <h3 className="text-xl font-bold mb-2">
          {uploadStatus === 'uploading' ? 'Uploading Replay' : 'Analyzing Gameplay'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {uploadStatus === 'uploading' 
            ? 'Please wait while we upload your replay...' 
            : 'Our AI is analyzing your gameplay patterns...'}
        </p>
        <div className="w-full max-w-xs mb-2 transition-all duration-300">
          <Progress value={uploadStatus === 'uploading' ? progress : 100} className="h-2 transition-all duration-300" />
        </div>
        <p className="text-sm text-muted-foreground">
          {uploadStatus === 'uploading' ? `${progress}% Complete` : 'Almost done...'}
        </p>
        
        <Button 
          variant="ghost" 
          onClick={onCancel} 
          className="mt-4 text-muted-foreground transition-colors hover:text-destructive"
        >
          <X className="mr-2 h-4 w-4" /> Cancel
        </Button>
      </div>
    </div>
  );
}
