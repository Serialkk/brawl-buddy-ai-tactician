
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";

// Error handler for API requests
export const handleApiError = (error: unknown, context: string = "Operation"): void => {
  console.error(`${context} failed:`, error);
  
  let errorMessage = "Something went wrong. Please try again.";
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    errorMessage = String((error as any).message);
  }
  
  toast.error(`${context} failed: ${errorMessage}`);
};

// Setup API cache configuration
export const configureQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes cache
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          const err = error as Error;
          // Don't retry for certain errors (like 404)
          if (err.message?.includes('404') || err.message?.includes('not found')) {
            return false;
          }
          return failureCount < 2; // Retry twice for other errors
        },
        onError: (error) => handleApiError(error, "Data fetch"),
      },
      mutations: {
        onError: (error) => handleApiError(error, "Update"),
      },
    },
  });
};
