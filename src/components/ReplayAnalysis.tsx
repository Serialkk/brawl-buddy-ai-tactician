
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Play, Check, AlertCircle, X } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { toast } from "sonner";

export function ReplayAnalysis() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'complete' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [replayData, setReplayData] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setSelectedFile(file);
    
    // Check file type and size
    const validTypes = ['video/mp4', 'video/webm', 'application/json']; // Allow video and JSON replay files
    const maxSize = 1024 * 1024 * 1024; // 1GB max (increased from 20MB)
    
    if (!validTypes.includes(file.type)) {
      toast.error("Ungültiges Dateiformat. Bitte MP4, WEBM oder JSON-Datei hochladen.");
      e.target.value = '';
      setSelectedFile(null);
      return;
    }
    
    if (file.size > maxSize) {
      toast.error("Die Datei ist zu groß. Maximale Größe: 1GB");
      e.target.value = '';
      setSelectedFile(null);
      return;
    }
    
    // Auto-start upload if file is selected
    handleUpload(file);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      handleUpload(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
        const mockData = generateMockAnalysisResults();
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
  
  const generateMockAnalysisResults = () => {
    // In a real app, this would come from the backend analysis
    const brawlerUsed = selectedFile?.name.includes('shelly') ? 'Shelly' : 
                       selectedFile?.name.includes('colt') ? 'Colt' : 'Poco';
    
    const gameMode = Math.random() > 0.5 ? 'Gem Grab' : 'Brawl Ball';
    const accuracy = Math.floor(60 + Math.random() * 30);
    const positioning = Math.floor(50 + Math.random() * 40);
    const superUsage = Math.floor(65 + Math.random() * 30);
    const mapControl = Math.floor(45 + Math.random() * 45);
    
    return {
      brawlerUsed,
      gameMode,
      metrics: {
        accuracy,
        positioning,
        superUsage,
        mapControl
      },
      strengths: [
        "Excellent use of cover during team fights",
        "Great super timing when pushing the enemy team",
        `Effective ${gameMode === 'Gem Grab' ? 'gem control' : 'ball control'} throughout mid-game`
      ],
      weaknesses: [
        "Over-aggression at 2:14 led to unnecessary death",
        "Super was wasted at 1:45 when no enemies were nearby",
        "Poor lane positioning during the final countdown"
      ],
      timestamp: new Date().toISOString()
    };
  };
  
  const handleReset = () => {
    setUploadStatus('idle');
    setProgress(0);
    setSelectedFile(null);
    setReplayData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
        <div 
          className="brawl-card p-8 max-w-md mx-auto border-2 border-dashed border-muted rounded-lg transition-all hover:border-brawl-blue"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload Replay</h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop your replay file or click to browse
            </p>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".mp4,.webm,.json"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              className="brawl-button brawl-button-primary"
            >
              <Upload className="mr-2 h-4 w-4" /> Select Replay
            </Button>
          </div>
        </div>
      )}
      
      {(uploadStatus === 'uploading' || uploadStatus === 'analyzing') && (
        <div className="brawl-card p-8 max-w-md mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              {uploadStatus === 'uploading' ? (
                <Upload className="h-10 w-10 text-muted-foreground animate-pulse" />
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
            <div className="w-full max-w-xs mb-2">
              <Progress value={uploadStatus === 'uploading' ? progress : 100} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              {uploadStatus === 'uploading' ? `${progress}% Complete` : 'Almost done...'}
            </p>
            
            <Button 
              variant="ghost" 
              onClick={handleReset} 
              className="mt-4 text-muted-foreground"
            >
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </div>
        </div>
      )}
      
      {uploadStatus === 'error' && (
        <div className="brawl-card p-8 max-w-md mx-auto border border-destructive">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analysis Failed</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't analyze your replay. Please try again with a different file.
            </p>
            <Button onClick={handleReset} className="brawl-button">
              Try Again
            </Button>
          </div>
        </div>
      )}
      
      {uploadStatus === 'complete' && replayData && (
        <div className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center">
                  <OptimizedImage 
                    src={`/brawlers/${replayData.brawlerUsed?.toLowerCase()}.png`} 
                    alt={replayData.brawlerUsed || "Brawler"} 
                    fallback="/placeholder.svg"
                    className="h-10 w-10 object-contain" 
                  />
                </div>
                <div>
                  <h3 className="font-bold">{replayData.brawlerUsed || "Unknown Brawler"}</h3>
                  <p className="text-sm text-muted-foreground">{replayData.gameMode || "Unknown Mode"}</p>
                </div>
              </div>
              <Button onClick={handleReset} variant="outline" size="sm">
                Analyze Another Replay
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="brawl-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" /> 
                  Strengths
                </CardTitle>
                <CardDescription>What you did well in this match</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {replayData.strengths.map((strength: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-500" />
                      </div>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="brawl-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-brawl-red" /> 
                  Areas to Improve
                </CardTitle>
                <CardDescription>Focus on these aspects to get better</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {replayData.weaknesses.map((weakness: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-brawl-red/20 flex items-center justify-center">
                        <AlertCircle className="h-3 w-3 text-brawl-red" />
                      </div>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="brawl-card">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key statistics from your match</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Accuracy</p>
                  <p className="text-2xl font-bold text-brawl-blue">{replayData.metrics.accuracy}%</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Positioning</p>
                  <p className="text-2xl font-bold text-brawl-yellow">{replayData.metrics.positioning}%</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Super Usage</p>
                  <p className="text-2xl font-bold text-brawl-purple">{replayData.metrics.superUsage}%</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Map Control</p>
                  <p className="text-2xl font-bold text-brawl-red">{replayData.metrics.mapControl}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8">
            <Button onClick={handleReset} className="brawl-button brawl-button-primary">
              Analyze Another Replay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReplayAnalysis;
