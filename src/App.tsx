
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
import { configureQueryClient } from "@/utils/apiUtils";
import { DefaultLoadingComponent } from "@/utils/lazyLoad";

// Lazy loaded pages
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Configure QueryClient with optimized settings
const queryClient = configureQueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LoadingProvider>
        <GameDataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<DefaultLoadingComponent />}>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Index />} />
                    {/* Add additional protected routes here */}
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </GameDataProvider>
      </LoadingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
