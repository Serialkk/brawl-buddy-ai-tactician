import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { GameDataProvider } from "@/contexts/GameDataContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { configureQueryClient } from "@/utils/apiUtils";
import { DefaultLoadingComponent } from "@/utils/lazyLoad";
import { AlertTriangle, Bell } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";

// Configure query client
const queryClient = configureQueryClient();

// Lazy loaded pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));
const PatchNotes = lazy(() => import("./pages/PatchNotes"));
const ReplayAnalysis = lazy(() => import("./components/ReplayAnalysis"));
const Maps = lazy(() => import("./components/Maps"));
const TeamComposition = lazy(() => import("./components/TeamComposition"));
const StrategyGuide = lazy(() => import("./components/strategy-guide/StrategyGuide"));
const RealTimeStats = lazy(() => import("./components/RealTimeStats"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LoadingProvider>
        <GameDataProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                {/* Background Image */}
                <div 
                  className="fixed inset-0 z-0" 
                  style={{
                    backgroundImage: 'url("/lovable-uploads/4a743b64-2eaa-48a1-9347-0cdfd55aa83d.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />

                {/* Content Container with Background Overlay */}
                <div className="relative z-10 min-h-screen bg-black/40 backdrop-blur-sm">
                  {/* Breaking News Banner */}
                  <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-brawl-red via-brawl-purple to-brawl-blue p-2 text-white shadow-lg z-50">
                    <div className="container mx-auto">
                      <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center gap-3 mb-2 md:mb-0">
                          <AlertTriangle className="h-5 w-5 text-brawl-yellow animate-pulse" />
                          <span className="font-bold text-lg">Patch 61.0</span>
                          <span className="text-sm bg-black/30 px-2 py-1 rounded">18. April 2025</span>
                        </div>
                        
                        <div className="flex-1 max-w-2xl mx-4 overflow-hidden">
                          <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite]">
                            <span className="text-brawl-yellow font-bold">BREAKING NEWS:</span> Rico erhält bedeutende Nerfs - Reichweite und Schaden der Standardattacke um 10% reduziert!
                          </div>
                        </div>
                        
                        <Bell className="h-5 w-5 text-brawl-yellow hidden md:block" />
                      </div>
                    </div>
                  </div>

                  {/* Layout structure */}
                  <div className="flex flex-col min-h-screen">
                    {/* Navigation bar positioned below the banner */}
                    <div className="mt-12">
                      <MainNavbar />
                    </div>

                    {/* Main content */}
                    <main className="flex-grow container mx-auto p-6 mt-12">
                      <Suspense fallback={<DefaultLoadingComponent />}>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route element={<ProtectedRoute />}>
                            <Route path="/profile" element={<Profile />} />
                          </Route>
                          <Route path="/patch-notes" element={<PatchNotes />} />
                          <Route path="/replay-analysis" element={<ReplayAnalysis />} />
                          <Route path="/maps" element={<Maps />} />
                          <Route path="/team-composition" element={<TeamComposition />} />
                          <Route path="/strategy" element={<StrategyGuide />} />
                          <Route path="/stats" element={<RealTimeStats />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </main>
                  </div>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </GameDataProvider>
      </LoadingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
