
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6 rounded-lg border border-border bg-card">
        <h1 className="text-4xl font-bold mb-4 text-brawl-purple">404</h1>
        <p className="text-xl text-foreground mb-6">Page not found</p>
        <Button onClick={() => navigate("/")} className="brawl-gradient">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
