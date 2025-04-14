
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, ThumbsUp, Filter, Star, Info } from "lucide-react";
import { BrawlerCard } from "./BrawlerCard";
import { Brawler, brawlerRoles } from "@/data/brawlers";

interface BrawlerSelectorProps {
  brawlers: Brawler[];
  selectedBrawlers: number[];
  onSelectBrawler: (id: number) => void;
  showRecommendations: boolean;
  onToggleRecommendations: () => void;
  getCompatibility: (id: number) => number | undefined;
  onResetSelection: () => void;
}

export const BrawlerSelector = ({
  brawlers,
  selectedBrawlers,
  onSelectBrawler,
  showRecommendations,
  onToggleRecommendations,
  getCompatibility,
  onResetSelection
}: BrawlerSelectorProps) => {
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [rarityFilter, setRarityFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const rarities = useMemo(() => {
    return Array.from(new Set(brawlers.map(b => b.rarity)));
  }, [brawlers]);

  const filteredBrawlers = useMemo(() => {
    return brawlers.filter(brawler => {
      const matchesRole = roleFilter === "all" || brawler.role === roleFilter;
      const matchesRarity = rarityFilter === "all" || brawler.rarity === rarityFilter;
      const matchesSearch = brawler.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRole && matchesRarity && matchesSearch;
    });
  }, [brawlers, roleFilter, rarityFilter, searchQuery]);

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-brawl-blue" /> Select Your Team
        </CardTitle>
        <CardDescription>
          {selectedBrawlers.length === 0 
            ? "Choose up to 3 Brawlers for your team" 
            : `Selected ${selectedBrawlers.length}/3 Brawlers`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={showRecommendations ? "default" : "outline"}
              className={`${showRecommendations ? "bg-brawl-blue hover:bg-brawl-blue/90" : ""}`}
              onClick={onToggleRecommendations}
              disabled={selectedBrawlers.length === 0}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Show Compatible Brawlers
            </Button>
            {selectedBrawlers.length > 0 && (
              <Button variant="outline" onClick={onResetSelection}>
                Reset Selection
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-grow">
            {/* Role Filter */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {brawlerRoles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Rarity Filter */}
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger>
                <Star className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarities</SelectItem>
                {rarities.map(rarity => (
                  <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search brawlers..."
                className="w-full px-4 py-2 border border-border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBrawlers.map(brawler => (
            <BrawlerCard
              key={brawler.id}
              id={brawler.id}
              name={brawler.name}
              role={brawler.role}
              rarity={brawler.rarity}
              image={brawler.image}
              selected={selectedBrawlers.includes(brawler.id)}
              onClick={() => onSelectBrawler(brawler.id)}
              compatibility={showRecommendations ? getCompatibility(brawler.id) : undefined}
            />
          ))}
          
          {filteredBrawlers.length === 0 && (
            <div className="col-span-full p-8 text-center">
              <Info className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No brawlers match your filters.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setRoleFilter("all");
                  setRarityFilter("all");
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
