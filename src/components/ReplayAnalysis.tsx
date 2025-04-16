
import { useState } from "react";
import { UploadCard } from "./replay-analysis/UploadCard";
import { ProgressCard } from "./replay-analysis/ProgressCard";
import { ErrorCard } from "./replay-analysis/ErrorCard";
import { ResultsView } from "./replay-analysis/ResultsView";
import { generateMockAnalysisResults } from "./replay-analysis/utils/analysisUtils";
import { toast } from "sonner";

export function ReplayAnalysis() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'complete' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [replayData, setReplayData] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    handleUpload(file);
  };
  
  const handleUpload = (file: File) => {
    setUploadStatus('uploading');
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('analyzing');
          simulateAnalysis();
          return 100;
        }
        return prev + 5; // Slower progress for realism
      });
    }, 100);
  };
  
  const simulateAnalysis = () => {
    // In a real app, we would send the file to a backend service
    // Here we'll simulate the analysis with a timeout
    const timeout = setTimeout(() => {
      try {
        // Generate mock analysis results
        const mockData = generateMockAnalysisResults(selectedFile);
        setReplayData(mockData);
        setUploadStatus('complete');
        toast.success("Replay-Analyse erfolgreich abgeschlossen!");
      } catch (error) {
        console.error("Analysis error:", error);
        setUploadStatus('error');
        toast.error("Bei der Analyse ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
      }
    }, 3000);
    
    return () => clearTimeout(timeout);
  };
  
  const handleReset = () => {
    setUploadStatus('idle');
    setProgress(0);
    setSelectedFile(null);
    setReplayData(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Replay Analysis
        </h1>
        <p className="text-muted-foreground">
          Upload your Brawl Stars replays and our AI will analyze your gameplay, identify mistakes, and provide personalized tips.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Unterstützt Dateien bis zu 1GB Größe.
        </p>
      </div>
      
      {uploadStatus === 'idle' && (
        <UploadCard onFileSelect={handleFileSelect} />
      )}
      
      {(uploadStatus === 'uploading' || uploadStatus === 'analyzing') && (
        <ProgressCard 
          uploadStatus={uploadStatus} 
          progress={progress} 
          onCancel={handleReset} 
        />
      )}
      
      {uploadStatus === 'error' && (
        <ErrorCard onReset={handleReset} />
      )}
      
      {uploadStatus === 'complete' && replayData && (
        <ResultsView replayData={replayData} onReset={handleReset} />
      )}
    </div>
  );
}

export default ReplayAnalysis;
