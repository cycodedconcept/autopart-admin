import React from "react";
import { Minus, Plus, TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title?: string;
  value?: string | number | null;
  trendType?: "positive" | "negative" | "neutral";
  subtext?: string;
  subtextType?: "warning" | "neutral";
  icon?: React.ReactNode;
  status?: string;
  trendImage?: {
    imgg: Record<string, React.ComponentType<any>>;
    bgColor: string;
    imgColor: string;
  };
  trendDirection?: string;
  trendLabel?: string;
  changePercent?: string | number | null;
  titleStyle?: string;
  divStyle?: string;
}

export default function MetricCard({
  title,
  value,
  status,
  trendImage,
  trendDirection,
  trendLabel,
  changePercent,
  titleStyle = "text-[11px] text-lighttext tracking-wider",
  divStyle = "flex flex-col justify-between min-h-30"
}: MetricCardProps) {
  const trendImageObject = trendImage?.imgg;
  const TrendImageComponent = trendImageObject
    ? (Object.values(trendImageObject)[0] as React.ComponentType<any>)
    : null;

  const isAbsolute = (num: string | number | null | undefined) =>
    Number(num ?? 0) >= 0;

  return (
    <div className={`bg-white p-4 rounded-lg border border-lightborder ${divStyle}`}>
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <span className={`${titleStyle}`}>
          {title}
        </span>

        {TrendImageComponent && (
          <div className={`${trendImage?.bgColor} p-1.5 rounded`}>
            <TrendImageComponent size={15} color={trendImage?.imgColor} />
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="my-0.5">
        <h3 className="text-xl font-bold text-[#0E121B] tracking-tight">
          {value}
        </h3>
      </div>

      {/* Footer Meta Metrics */}
      {trendLabel && (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center">
            <div
              className={` rounded ${
                trendDirection === "up"
                  ? "text-lighter-green"
                  : trendDirection === "down"
                    ? " text-[#FB3636]"
                    : "text-lighttext"
              }`}
            >
              {trendDirection === "up" ? (
                <TrendingUp size={14} />
              ) : trendDirection === "down" ? (
                <TrendingDown size={14} />
              ) : null}
            </div>
            <div
              className={`text-[10px] font-medium flex items-center gap-0.5 ${
                trendDirection === "up"
                  ? "text-lighter-green"
                  : trendDirection === "down"
                    ? " text-[#FB3636]"
                    : "text-lighttext"
              }`}
            >
              {(!!changePercent) && (
                <div>
                  {isAbsolute(changePercent) ? (
                    <Plus className="text-lighter-green" size={10} />
                  ) : (
                    <Minus className="text-[#FB3636]" size={10} />
                  )}
                </div>
              )}
              <span>{Math.abs(Number(changePercent ?? 0))}</span>{" "}
              <span>{trendLabel}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
