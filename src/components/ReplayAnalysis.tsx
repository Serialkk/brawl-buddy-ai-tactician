
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Play, Check, AlertCircle } from "lucide-react";

export function ReplayAnalysis() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  
  const handleUpload = () => {
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
        return prev + 10;
      });
    }, 300);
  };
  
  const simulateAnalysis = () => {
    setTimeout(() => {
      setUploadStatus('complete');
    }, 2000);
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
      </div>
      
      {uploadStatus === 'idle' && (
        <div className="brawl-card p-8 max-w-md mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload Replay</h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop your replay file or click to browse
            </p>
            <Button onClick={handleUpload} className="brawl-button brawl-button-primary">
              Select Replay
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
          </div>
        </div>
      )}
      
      {uploadStatus === 'complete' && (
        <div className="space-y-6">
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
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Excellent use of cover during team fights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Great super timing when pushing the enemy team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Effective gem control throughout mid-game</span>
                  </li>
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
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-brawl-red/20 flex items-center justify-center">
                      <AlertCircle className="h-3 w-3 text-brawl-red" />
                    </div>
                    <span>Over-aggression at 2:14 led to unnecessary death</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-brawl-red/20 flex items-center justify-center">
                      <AlertCircle className="h-3 w-3 text-brawl-red" />
                    </div>
                    <span>Super was wasted at 1:45 when no enemies were nearby</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-brawl-red/20 flex items-center justify-center">
                      <AlertCircle className="h-3 w-3 text-brawl-red" />
                    </div>
                    <span>Poor lane positioning during the final countdown</span>
                  </li>
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
                  <p className="text-2xl font-bold text-brawl-blue">78%</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Positioning</p>
                  <p className="text-2xl font-bold text-brawl-yellow">65%</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Super Usage</p>
                  <p className="text-2xl font-bold text-brawl-purple">82%</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Map Control</p>
                  <p className="text-2xl font-bold text-brawl-red">59%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8">
            <Button onClick={() => setUploadStatus('idle')} className="brawl-button brawl-button-primary">
              Analyze Another Replay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
