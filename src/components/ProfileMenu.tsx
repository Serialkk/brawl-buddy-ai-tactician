
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

export function ProfileMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
    }
  };

  const getInitials = () => {
    if (user?.user_metadata?.username) {
      return user.user_metadata.username.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || "??";
  };
  
  if (!user) {
    return (
      <Button variant="outline" onClick={() => navigate("/auth")}>
        <User className="mr-2 h-4 w-4" />
        Log In
      </Button>
    );
  }

  return (
    <div className="relative">
      <Avatar
        className="h-10 w-10 cursor-pointer border-2 border-transparent hover:border-primary transition-all"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <AvatarFallback className="bg-gradient-to-br from-brawl-blue to-brawl-purple text-white">
          {getInitials()}
        </AvatarFallback>
      </Avatar>
      
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card border border-border z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm font-medium truncate">
                {user?.user_metadata?.username || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            
            <button
              onClick={handleSignOut}
              className="flex w-full items-center px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
