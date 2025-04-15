
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { List, Save, FolderOpen, Trash2, Edit, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface SavedTeam {
  id: string;
  team_name: string;
  game_mode: string;
  brawler_ids: number[];
  notes?: string;
  created_at: string;
}

interface SavedTeamsMenuProps {
  selectedMode: string;
  selectedBrawlers: number[];
  onLoadTeam: (brawlers: number[], gameMode: string) => void;
}

export const SavedTeamsMenu = ({ selectedMode, selectedBrawlers, onLoadTeam }: SavedTeamsMenuProps) => {
  const [teamName, setTeamName] = useState("");
  const [teamNotes, setTeamNotes] = useState("");
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  
  // Load saved teams
  useEffect(() => {
    if (!user) return;
    
    const fetchSavedTeams = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("saved_teams")
        .select("*")
        .order("created_at", { ascending: false });
        
      setLoading(false);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load saved teams",
          variant: "destructive",
        });
        return;
      }
      
      setSavedTeams(data || []);
    };
    
    fetchSavedTeams();
  }, [user, toast]);
  
  // Save or update team
  const handleSaveTeam = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save teams",
        variant: "destructive",
      });
      return;
    }
    
    if (!teamName.trim()) {
      toast({
        title: "Error",
        description: "Team name is required",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedBrawlers.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one brawler",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      if (isEdit && currentTeamId) {
        // Update existing team
        const { error } = await supabase
          .from("saved_teams")
          .update({
            team_name: teamName,
            game_mode: selectedMode,
            brawler_ids: selectedBrawlers,
            notes: teamNotes,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentTeamId);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Team composition updated successfully",
        });
      } else {
        // Save new team
        const { error } = await supabase
          .from("saved_teams")
          .insert({
            user_id: user.id,
            team_name: teamName,
            game_mode: selectedMode,
            brawler_ids: selectedBrawlers,
            notes: teamNotes,
          });
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Team composition saved successfully",
        });
      }
      
      // Refresh saved teams list
      const { data, error } = await supabase
        .from("saved_teams")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      setSavedTeams(data || []);
      setTeamName("");
      setTeamNotes("");
      setIsEdit(false);
      setCurrentTeamId(null);
      setSaveDialogOpen(false);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save team",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Load team
  const handleLoadTeam = (team: SavedTeam) => {
    onLoadTeam(team.brawler_ids, team.game_mode);
    toast({
      title: "Team Loaded",
      description: `${team.team_name} has been loaded`,
    });
  };
  
  // Delete team
  const handleDeleteTeam = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("saved_teams")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      // Update the list
      setSavedTeams(savedTeams.filter(team => team.id !== id));
      
      toast({
        title: "Success",
        description: "Team deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete team",
        variant: "destructive",
      });
    }
  };
  
  // Edit team
  const handleEditTeam = (team: SavedTeam) => {
    setIsEdit(true);
    setCurrentTeamId(team.id);
    setTeamName(team.team_name);
    setTeamNotes(team.notes || "");
    setSaveDialogOpen(true);
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" disabled={!user} className="bg-brawl-purple hover:bg-brawl-purple/90">
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? "Update Team" : "Save Team"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEdit ? "Update Team Composition" : "Save Team Composition"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="teamName" className="text-sm font-medium">Team Name</label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="teamNotes" className="text-sm font-medium">Notes (Optional)</label>
                <Textarea
                  id="teamNotes"
                  value={teamNotes}
                  onChange={(e) => setTeamNotes(e.target.value)}
                  placeholder="Enter notes about this team composition"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleSaveTeam} 
                disabled={loading || !teamName.trim()} 
                className="bg-brawl-purple hover:bg-brawl-purple/90"
              >
                {loading ? "Saving..." : isEdit ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={!user || savedTeams.length === 0}>
              <FolderOpen className="mr-2 h-4 w-4" />
              Load Team
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[240px]">
            {savedTeams.map((team) => (
              <DropdownMenuItem 
                key={team.id}
                className="flex justify-between items-center cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault(); // Prevent menu from closing
                }}
              >
                <span className="truncate flex-1" onClick={() => handleLoadTeam(team)}>
                  {team.team_name}
                </span>
                <div className="flex space-x-1 ml-2">
                  <Edit 
                    className="h-4 w-4 text-blue-500 cursor-pointer" 
                    onClick={() => handleEditTeam(team)}
                  />
                  <Trash2 
                    className="h-4 w-4 text-red-500 cursor-pointer" 
                    onClick={() => handleDeleteTeam(team.id)}
                  />
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {!user && (
          <div className="text-sm text-muted-foreground flex items-center">
            <span>Please sign in to save and load teams</span>
          </div>
        )}
      </div>
    </div>
  );
};
