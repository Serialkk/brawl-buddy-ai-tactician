
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "@/components/ProfileMenu";
import { 
  Activity, 
  Users, 
  BookOpen, 
  Target,
  Layout,
  MapPin,
  BarChart,
  Menu, 
  X 
} from "lucide-react";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 w-full rounded-lg transition-all",
        active 
          ? "bg-brawl-purple text-white font-bold" 
          : "hover:bg-secondary text-muted-foreground hover:text-white"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
};

export function Navigation({ activeTab, setActiveTab }: { 
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'replay', label: 'Replay Analysis', icon: Activity },
    { id: 'team', label: 'Team Composition', icon: Users },
    { id: 'strategy', label: 'Strategy Guide', icon: BookOpen },
    { id: 'opponent', label: 'Opponent Prediction', icon: Target },
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'maps', label: 'Maps', icon: MapPin },
    { id: 'stats', label: 'Real-Time Stats', icon: BarChart },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center w-full p-4 bg-card border-b">
        <h1 className="text-xl text-white">
          <span className="text-brawl-blue">Brawl</span>
          <span className="text-brawl-purple">Buddy</span>
        </h1>
        <div className="flex items-center gap-2">
          <ProfileMenu />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute z-50 top-16 left-0 right-0 bg-card shadow-lg border-b border-border">
          <div className="p-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col gap-2 w-64 p-4 border-r border-border">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brawl-blue to-brawl-purple flex items-center justify-center text-white font-bold text-lg">
              BB
            </div>
            <h2 className="font-bold text-xl">
              <span className="text-brawl-blue">Brawl</span>
              <span className="text-brawl-purple">Buddy</span>
            </h2>
          </div>
          <ProfileMenu />
        </div>
        
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

