
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface DetectionBox {
  box: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
  label: string;
  score: number;
}

interface BrawlerDetectionCardProps {
  detections: DetectionBox[];
}

export function BrawlerDetectionCard({ detections }: BrawlerDetectionCardProps) {
  return (
    <Card className="brawl-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Eye className="h-5 w-5 text-brawl-blue" /> 
          YOLOv8 Brawler Detection
        </CardTitle>
        <CardDescription>Detected characters in your replay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {detections.map((detection, index) => (
            <div key={index} className="bg-secondary/70 rounded-lg p-4 flex flex-col items-center">
              <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center mb-2">
                <img 
                  src={`/brawlers/${detection.label?.toLowerCase()}.png`}
                  alt={detection.label} 
                  className="h-10 w-10 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="text-center">
                <p className="font-bold font-lilita">{detection.label}</p>
                <p className="text-xs text-muted-foreground">
                  Confidence: {(detection.score * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {detections.length === 0 && (
          <div className="text-center py-6">
            <p>No brawlers detected in this replay.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
