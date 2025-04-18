import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, ThumbsUp, Filter, Star, Info, Loader2, Search, X } from "lucide-react";
import { BrawlerCard } from "./BrawlerCard";
import { Brawler } from "@/data/types/brawler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface BrawlerSelectorProps {
  brawlers: Brawler[];
  selectedBrawlers: number[];
  onSelectBrawler: (id: number) => void;
  showRecommendations: boolean;
  onToggleRecommendations: () => void;
  getCompatibility: (id: number) => number | undefined;
  onResetSelection: () => void;
  isLoading?: boolean;
}

export const BrawlerSelector = ({
  brawlers,
  selectedBrawlers,
  onSelectBrawler,
  showRecommendations,
  onToggleRecommendations,
  getCompatibility,
  onResetSelection,
  isLoading = false
}: BrawlerSelectorProps) => {
  const [roleFilter, setRoleFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const rarities = useMemo(() => {
    return Array.from(new Set(brawlers.map(b => b.rarity)));
  }, [brawlers]);

  const roles = useMemo(() => {
    return Array.from(new Set(brawlers.map(b => b.role)));
  }, [brawlers]);

  const filteredBrawlers = useMemo(() => {
    return brawlers.filter(brawler => {
      const matchesRole = roleFilter === "all" || brawler.role === roleFilter;
      const matchesRarity = rarityFilter === "all" || brawler.rarity === rarityFilter;
      const matchesSearch = brawler.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRole && matchesRarity && matchesSearch;
    });
  }, [brawlers, roleFilter, rarityFilter, searchQuery]);

  const clearFilters = () => {
    setRoleFilter("all");
    setRarityFilter("all");
    setSearchQuery("");
  };

  const hasActiveFilters = roleFilter !== "all" || rarityFilter !== "all" || searchQuery !== "";

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
        <div className="mb-6 space-y-4">
          {/* Action Buttons */}
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
              <Button variant="outline" onClick={onResetSelection} className="border-red-500 text-red-500 hover:bg-red-50">
                <X className="mr-2 h-4 w-4" />
                Reset Selection
              </Button>
            )}
            
            {/* View Toggle */}
            <div className="ml-auto flex bg-muted rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 ${viewMode === "grid" ? "bg-background" : ""}`}
              >
                Grid
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 ${viewMode === "list" ? "bg-background" : ""}`}
              >
                List
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search brawlers..."
                className="w-full px-10 py-2 border border-border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            
            {/* Role Filter */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Rarity Filter */}
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger className="w-[180px]">
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
            
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                Clear filters
              </Button>
            )}
          </div>
          
          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {roleFilter !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Role: {roleFilter}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setRoleFilter("all")}
                  />
                </Badge>
              )}
              {rarityFilter !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Rarity: {rarityFilter}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setRarityFilter("all")}
                  />
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-brawl-purple mb-4" />
            <p className="text-muted-foreground">Brawler werden geladen...</p>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
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
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Role</th>
                      <th className="text-left p-2">Rarity</th>
                      <th className="text-center p-2">Health</th>
                      <th className="text-center p-2">Damage</th>
                      <th className="text-center p-2">Range</th>
                      {showRecommendations && <th className="text-center p-2">Compatibility</th>}
                      <th className="text-right p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrawlers.map(brawler => (
                      <tr 
                        key={brawler.id} 
                        className={`border-b border-border hover:bg-muted/50 ${
                          selectedBrawlers.includes(brawler.id) ? "bg-brawl-blue/10" : ""
                        }`}
                      >
                        <td className="p-2 font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                              <OptimizedImage 
                                src={brawler.image} 
                                alt={brawler.name}
                                className="w-full h-full object-cover"
                                fallback={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><text x="50%" y="50%" font-size="16" text-anchor="middle" dy=".3em" fill="currentColor">${brawler.name.charAt(0)}</text></svg>`}
                              />
                            </div>
                            {brawler.name}
                          </div>
                        </td>
                        <td className="p-2">{brawler.role}</td>
                        <td className="p-2">
                          <Badge variant="outline">{brawler.rarity}</Badge>
                        </td>
                        <td className="p-2 text-center">{brawler.stats.health}</td>
                        <td className="p-2 text-center">{brawler.stats.damage}</td>
                        <td className="p-2 text-center">{brawler.stats.range}</td>
                        {showRecommendations && (
                          <td className="p-2 text-center">
                            {getCompatibility(brawler.id) && (
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-green-600 h-2.5 rounded-full" 
                                  style={{ width: `${getCompatibility(brawler.id)}%` }}
                                ></div>
                              </div>
                            )}
                          </td>
                        )}
                        <td className="p-2 text-right">
                          <Button 
                            variant={selectedBrawlers.includes(brawler.id) ? "default" : "outline"} 
                            size="sm"
                            onClick={() => onSelectBrawler(brawler.id)}
                            className={selectedBrawlers.includes(brawler.id) ? "bg-brawl-purple hover:bg-brawl-purple/90" : ""}
                          >
                            {selectedBrawlers.includes(brawler.id) ? "Selected" : "Select"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {filteredBrawlers.length === 0 && (
              <div className="col-span-full p-8 text-center">
                <Info className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No brawlers match your filters.</p>
                <Button 
                  variant="link" 
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
