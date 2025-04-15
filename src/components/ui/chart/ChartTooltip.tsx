
import * as React from "react";
import { useChart } from "./ChartContext";
import { ChartConfig } from "./types";

interface ChartTooltipProps {
  content: React.FC<{
    active?: boolean;
    payload?: any[];
    label?: string;
  }>;
}

export const ChartTooltip = ({ content: Content }: ChartTooltipProps) => {
  return <Content />;
};

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const ChartTooltipContent = ({
  active,
  payload,
  label,
}: ChartTooltipContentProps) => {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      <div className="grid gap-1">
        {payload.map((item: any, index: number) => {
          const dataKey = item.dataKey;
          const configKey = Object.entries(config).find(
            ([_, value]) => (value as any).dataKey === dataKey
          )?.[0];
          const name = configKey
            ? config[configKey]?.label || configKey
            : item.name;

          return (
            <div key={index} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: item.color || item.fill,
                  }}
                />
                <span className="text-sm font-medium">{name}</span>
              </div>
              <span className="text-sm font-medium tabular-nums">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </div>
          );
        })}
      </div>
      {label ? (
        <div className="border-t border-muted pt-1 mt-1">
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ) : null}
    </div>
  );
};
