
import jsPDF from "jspdf";

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

interface ReplayData {
  brawlerUsed: string;
  gameMode: string;
  metrics: {
    accuracy: number;
    positioning: number;
    superUsage: number;
    mapControl: number;
  };
  strengths: string[];
  weaknesses: string[];
  timestamp: string;
  detectedObjects?: DetectionBox[];
}

export const generateAnalysisPDF = (replayData: ReplayData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const centerX = pageWidth / 2;
  
  // Set title
  doc.setFontSize(22);
  doc.setTextColor(41, 95, 203); // blue color
  doc.text("Brawl Stars Replay Analysis", centerX, 20, { align: "center" });
  
  // Add timestamp
  const date = new Date(replayData.timestamp).toLocaleString();
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${date}`, centerX, 30, { align: "center" });
  
  // Brawler and game mode info
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Brawler: ${replayData.brawlerUsed}`, 20, 45);
  doc.text(`Game Mode: ${replayData.gameMode}`, 20, 55);
  
  // YOLOv8 Detection info (if available)
  let yPos = 70;
  if (replayData.detectedObjects && replayData.detectedObjects.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(60, 103, 227); // brawl blue
    doc.text("YOLOv8 Detected Brawlers", 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    replayData.detectedObjects.forEach((detection, index) => {
      doc.text(
        `• ${detection.label} (${(detection.score * 100).toFixed(1)}% confidence)`,
        30, 
        yPos + (index * 8)
      );
    });
    yPos += 10 + (replayData.detectedObjects.length * 8);
  }
  
  // Performance metrics
  doc.setFontSize(16);
  doc.setTextColor(41, 95, 203);
  doc.text("Performance Metrics", 20, yPos);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Accuracy: ${replayData.metrics.accuracy}%`, 30, yPos + 10);
  doc.text(`Positioning: ${replayData.metrics.positioning}%`, 30, yPos + 20);
  doc.text(`Super Usage: ${replayData.metrics.superUsage}%`, 30, yPos + 30);
  doc.text(`Map Control: ${replayData.metrics.mapControl}%`, 30, yPos + 40);
  yPos += 50;
  
  // Strengths section
  doc.setFontSize(16);
  doc.setTextColor(46, 125, 50); // green color
  doc.text("Strengths", 20, yPos);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  replayData.strengths.forEach((strength, index) => {
    doc.text(`• ${strength}`, 30, yPos + 10 + (index * 10));
  });
  yPos += 20 + (replayData.strengths.length * 10);
  
  // Weaknesses section
  doc.setFontSize(16);
  doc.setTextColor(211, 47, 47); // red color
  doc.text("Areas to Improve", 20, yPos);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  replayData.weaknesses.forEach((weakness, index) => {
    doc.text(`• ${weakness}`, 30, yPos + 10 + (index * 10));
  });
  
  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Brawl Stars Analysis Tool with YOLOv8", centerX, footerY, { align: "center" });
  
  // Save the PDF
  doc.save(`brawl-analysis-${replayData.brawlerUsed}-${new Date().getTime()}.pdf`);
};
