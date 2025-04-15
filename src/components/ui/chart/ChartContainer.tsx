
import * as React from "react";
import { ChartContext } from "./ChartContext";
import { ChartConfig } from "./types";
import { createColorVariables } from "./utils";

interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}

export const ChartContainer = ({
  config,
  className,
  children,
}: ChartContainerProps) => {
  // Set CSS variables for chart colors
  const style = React.useMemo(
    () => createColorVariables(config),
    [config]
  );

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={className} style={style}>
        {children}
      </div>
    </ChartContext.Provider>
  );
};
