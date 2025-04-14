
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Layout, 
  Sparkles, 
  Link, 
  Zap,
  Brain,
  Palette,
  Rocket,
  Lock,
  Medal,
  Trophy,
  BarChart3,
  Calendar,
  Users,
  ArrowUpRight,
  CheckCircle,
  ShieldCheck,
  Loader,
  Wifi,
  Bell,
  Target,
  MessageSquareWarning,
  Mic,
  Github,
  MessageSquare,
  Mail
} from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "planned" | "in-progress" | "completed";
  eta?: string;
}

const FeatureCard = ({ title, description, icon, status, eta }: FeatureCardProps) => {
  const statusColors = {
    "planned": "bg-muted text-muted-foreground",
    "in-progress": "bg-brawl-yellow text-black",
    "completed": "bg-green-500 text-white"
  };
  
  const statusLabels = {
    "planned": "Planned",
    "in-progress": "In Progress",
    "completed": "Completed"
  };
  
  return (
    <Card className="overflow-hidden">
      <div className={`h-1 ${
        status === "planned" ? "bg-muted" : 
        status === "in-progress" ? "bg-brawl-yellow" : 
        "bg-green-500"
      }`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {eta && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">ETA:</span> {eta}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Development Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track the progress of Brawl Buddy's features and upcoming enhancements
        </p>
      </div>
      
      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="design" className="flex gap-2 items-center">
            <Palette className="h-4 w-4" /> Design
          </TabsTrigger>
          <TabsTrigger value="features" className="flex gap-2 items-center">
            <Sparkles className="h-4 w-4" /> Features
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex gap-2 items-center">
            <Link className="h-4 w-4" /> Integration
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex gap-2 items-center">
            <Zap className="h-4 w-4" /> Performance
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex gap-2 items-center">
            <Brain className="h-4 w-4" /> AI Features
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="design">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Enhanced UI Colors"
              description="Refined color palette with better contrast and accessibility"
              icon={<Palette className="h-5 w-5 text-brawl-purple" />}
              status="in-progress"
              eta="1 week"
            />
            <FeatureCard
              title="Animations & Transitions"
              description="Fluid motion and animations throughout the application"
              icon={<Sparkles className="h-5 w-5 text-brawl-blue" />}
              status="planned"
              eta="2 weeks"
            />
            <FeatureCard
              title="Mobile Responsiveness"
              description="Perfect display on all device sizes with improved interactions"
              icon={<Layout className="h-5 w-5 text-brawl-yellow" />}
              status="completed"
            />
            <FeatureCard
              title="Dark/Light Themes"
              description="Toggle between dark and light modes based on preference"
              icon={<Rocket className="h-5 w-5 text-brawl-red" />}
              status="planned"
              eta="3 weeks"
            />
            <FeatureCard
              title="Custom Icons"
              description="Brawl Stars themed icon set for enhanced visual identity"
              icon={<Medal className="h-5 w-5 text-brawl-yellow" />}
              status="planned"
              eta="2 weeks"
            />
            <FeatureCard
              title="Interactive Tooltips"
              description="Context-aware tooltips for better user guidance"
              icon={<Trophy className="h-5 w-5 text-brawl-blue" />}
              status="in-progress"
              eta="1 week"
            />
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Advanced Replay Timeline"
              description="Interactive timeline with key moments and insights"
              icon={<Calendar className="h-5 w-5 text-brawl-blue" />}
              status="planned"
              eta="3 weeks"
            />
            <FeatureCard
              title="Brawler Stats Database"
              description="Comprehensive stats for all brawlers with filtering"
              icon={<BarChart3 className="h-5 w-5 text-brawl-purple" />}
              status="in-progress"
              eta="2 weeks"
            />
            <FeatureCard
              title="Interactive Maps"
              description="Tactical overlay with positioning recommendations"
              icon={<Layout className="h-5 w-5 text-brawl-red" />}
              status="planned"
              eta="4 weeks"
            />
            <FeatureCard
              title="Personalized Training Plan"
              description="Custom training based on player performance"
              icon={<Users className="h-5 w-5 text-brawl-yellow" />}
              status="planned"
              eta="2 months"
            />
            <FeatureCard
              title="Meta Tracker"
              description="Real-time updates on game meta and balance changes"
              icon={<ArrowUpRight className="h-5 w-5 text-green-500" />}
              status="planned"
              eta="3 weeks"
            />
            <FeatureCard
              title="Achievement System"
              description="Progress tracking with skill-based achievements"
              icon={<Trophy className="h-5 w-5 text-brawl-yellow" />}
              status="planned"
              eta="1 month"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="integration">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="User Authentication"
              description="Secure login and profile management with Supabase"
              icon={<Lock className="h-5 w-5 text-brawl-blue" />}
              status="planned"
              eta="2 weeks"
            />
            <FeatureCard
              title="Cloud Storage"
              description="Save replays and analysis to the cloud"
              icon={<Layout className="h-5 w-5 text-brawl-purple" />}
              status="planned"
              eta="3 weeks"
            />
            <FeatureCard
              title="Social Sharing"
              description="Share insights and replays with friends or team"
              icon={<Users className="h-5 w-5 text-brawl-yellow" />}
              status="planned"
              eta="1 month"
            />
            <FeatureCard
              title="API Integration"
              description="Connect with Brawl Stars API for real-time data"
              icon={<Link className="h-5 w-5 text-brawl-red" />}
              status="in-progress"
              eta="2 weeks"
            />
            <FeatureCard
              title="Team Management"
              description="Create and manage teams for group analysis"
              icon={<Users className="h-5 w-5 text-green-500" />}
              status="planned"
              eta="1.5 months"
            />
            <FeatureCard
              title="Notifications System"
              description="Push notifications for insights and updates"
              icon={<Bell className="h-5 w-5 text-brawl-yellow" />}
              status="planned"
              eta="1 month"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Code Splitting"
              description="Optimized bundle size with dynamic imports"
              icon={<Zap className="h-5 w-5 text-brawl-blue" />}
              status="in-progress"
              eta="1 week"
            />
            <FeatureCard
              title="Optimized Rendering"
              description="Reduced re-renders with memoization"
              icon={<Rocket className="h-5 w-5 text-brawl-purple" />}
              status="planned"
              eta="2 weeks"
            />
            <FeatureCard
              title="Error Boundaries"
              description="Graceful error handling throughout the app"
              icon={<ShieldCheck className="h-5 w-5 text-brawl-yellow" />}
              status="planned"
              eta="1 week"
            />
            <FeatureCard
              title="Improved Loading States"
              description="Better UX with skeleton loading and transitions"
              icon={<Loader className="h-5 w-5 text-brawl-red" />}
              status="in-progress"
              eta="1 week"
            />
            <FeatureCard
              title="Offline Support"
              description="Basic functionality when offline with cached data"
              icon={<Wifi className="h-5 w-5 text-green-500" />}
              status="planned"
              eta="1 month"
            />
            <FeatureCard
              title="Performance Monitoring"
              description="Analytics to identify and fix bottlenecks"
              icon={<BarChart3 className="h-5 w-5 text-brawl-blue" />}
              status="planned"
              eta="2 weeks"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="ai">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Advanced Pattern Recognition"
              description="Identify complex gameplay patterns and habits"
              icon={<Brain className="h-5 w-5 text-brawl-blue" />}
              status="planned"
              eta="1 month"
            />
            <FeatureCard
              title="Personalized Recommendations"
              description="AI-tailored advice based on player history"
              icon={<CheckCircle className="h-5 w-5 text-brawl-purple" />}
              status="planned"
              eta="1.5 months"
            />
            <FeatureCard
              title="Meta Prediction Model"
              description="AI-powered predictions of upcoming meta shifts"
              icon={<Target className="h-5 w-5 text-brawl-yellow" />}
              status="planned"
              eta="2 months"
            />
            <FeatureCard
              title="Real-time Strategy Coach"
              description="In-game advice during live matches"
              icon={<MessageSquareWarning className="h-5 w-5 text-brawl-red" />}
              status="planned"
              eta="3 months"
            />
            <FeatureCard
              title="Voice Assistance"
              description="Voice-activated commands and insights"
              icon={<Mic className="h-5 w-5 text-green-500" />}
              status="planned"
              eta="2 months"
            />
            <FeatureCard
              title="Player Matchup Analysis"
              description="AI comparison of players and prediction of outcomes"
              icon={<Users className="h-5 w-5 text-brawl-blue" />}
              status="planned"
              eta="1.5 months"
            />
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-brawl-blue" /> Contribute to Development
          </CardTitle>
          <CardDescription>
            Join our community to help shape the future of Brawl Buddy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button className="bg-brawl-blue hover:bg-brawl-blue/90">
                  <Github className="mr-2 h-4 w-4" />
                  View GitHub Repository
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div>
                    <h4 className="text-sm font-semibold">GitHub Repository</h4>
                    <p className="text-sm">
                      View source code, report issues, and contribute to the project
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button className="bg-brawl-purple hover:bg-brawl-purple/90">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Join Discord Community
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div>
                    <h4 className="text-sm font-semibold">Discord Community</h4>
                    <p className="text-sm">
                      Chat with other users, suggest features, and get early access
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe to Updates
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div>
                    <h4 className="text-sm font-semibold">Development Newsletter</h4>
                    <p className="text-sm">
                      Get notified about new features and updates
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
