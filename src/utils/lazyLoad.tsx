
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export function lazyLoad(importFunc: () => Promise<{ default: React.ComponentType<any> }>, fallback: React.ReactNode = <DefaultLoadingComponent />) {
  const LazyComponent = lazy(importFunc);
  
  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export function DefaultLoadingComponent() {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <Loader2 className="h-8 w-8 animate-spin text-brawl-purple" />
    </div>
  );
}
