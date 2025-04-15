
import * as React from "react";
import { useChart } from "./ChartContext";

interface ChartLegendProps {
  content: React.FC<{
    payload?: any[];
  }>;
  verticalAlign?: "top" | "middle" | "bottom";
  align?: "left" | "center" | "right";
}

export const ChartLegend = ({
  content: Content,
  verticalAlign = "bottom",
  align = "center",
}: ChartLegendProps) => {
  return (
    <Content
      payload={[
        // This is a placeholder that gets replaced by recharts
      ]}
    />
  );
};

interface ChartLegendContentProps {
  payload?: any[];
}

export const ChartLegendContent = ({ payload }: ChartLegendContentProps) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 py-2">
      {payload.map((entry: any, index: number) => {
        const configItem =
          config[entry.value] ||
          Object.values(config).find(
            (item) => (item as any).dataKey === entry.value
          );
        const name = configItem?.label || entry.value;

        return (
          <div key={index} className="flex items-center gap-1">
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: entry.color,
              }}
            />
            <span className="text-sm text-muted-foreground">{name}</span>
          </div>
        );
      })}
    </div>
  );
};
