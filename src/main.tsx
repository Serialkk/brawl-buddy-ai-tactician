
import { createRoot } from 'react-dom/client';
import { StrictMode, Suspense, Component, ErrorInfo } from 'react';
import App from './App.tsx';
import './index.css';

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-6 max-w-md mx-auto bg-card rounded-lg shadow-lg border border-border">
        <h2 className="text-2xl font-bold text-brawl-red mb-4">Something went wrong</h2>
        <p className="text-foreground mb-6">{error.message}</p>
        <div className="flex justify-end">
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-brawl-purple text-white rounded hover:bg-brawl-purple/90"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

// Fixed Custom Error Boundary using React.Component
class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error as Error} 
          resetErrorBoundary={() => this.setState({ hasError: false, error: null })} 
        />
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin text-brawl-purple h-12 w-12 border-4 border-t-transparent rounded-full"></div>
      </div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
