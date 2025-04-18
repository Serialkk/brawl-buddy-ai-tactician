
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PositioningMap } from "../strategy-guide/components/PositioningMap";
import { Card, CardContent } from "@/components/ui/card";
import { Info, MapPin } from "lucide-react";

interface MapDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  map: {
    name: string;
    environment?: string;
    gameMode?: string;
  };
}

export const MapDetailsModal: React.FC<MapDetailsModalProps> = ({
  isOpen,
  onClose,
  map
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <MapPin className="h-6 w-6 text-brawl-purple" />
            {map.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 mt-4">
          <Card className="bg-black/20 border border-border">
            <CardContent className="pt-6">
              <PositioningMap brawlerName="Shelly" />
              <div className="text-center mt-4 text-sm text-muted-foreground">
                <span className="flex items-center justify-center gap-2">
                  <Info className="h-4 w-4" />
                  Empfohlene Positionen für verschiedene Brawler
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="p-4 bg-black/20 rounded-lg border border-border">
              <h3 className="font-bold mb-2">Map-Tipps</h3>
              <ul className="space-y-2 text-sm">
                <li>• Nutze die Büsche für überraschende Angriffe</li>
                <li>• Kontrolliere die Mitte für besseren Map-Überblick</li>
                <li>• Achte auf Fluchtwege und Deckungsmöglichkeiten</li>
              </ul>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-border">
              <h3 className="font-bold mb-2">Empfohlene Brawler</h3>
              <ul className="space-y-2 text-sm">
                <li>• <span className="text-brawl-blue">Shelly</span> - Gut für Büsche und enge Bereiche</li>
                <li>• <span className="text-brawl-purple">Bull</span> - Stark in Nahkampf-Situationen</li>
                <li>• <span className="text-brawl-red">Colt</span> - Effektiv für lange Korridore</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
