import React from "react";
import { CardWrapper } from "../ui/cardWrapper";
import getRelativeTimeString from "../atoms/timeStamp";

export interface RecentActivity {
  auditLogId: number;
  action: string;
  targetType: string;
  targetId: number | null;
  actorName: string;
  createdAt: string;
  summary: string;
}

export const RecentActivity = ({
  activities = [],
}: {
  activities: RecentActivity[];
}) => {
  const getDotColorStyle = (type: string): string => {
    switch (type) {
      case "payout":
        return "bg-[#FB3636] ";
      case "dispute":
        return "bg-light-green ";
      case "platform_config":
        return "bg-[#185FA5]";

      default:
        return "bg-aorange ";
    }
  };
  return (
    <CardWrapper title="Recent activity">
      <div className="relative flex flex-col pl-4 space-y-5 py-2">
        {activities.map((activity, idx) => {
          return (
            <div key={idx} className="relative flex flex-col text-xs">
              {/* Timeline Dot Node */}
              <div
                className={`absolute -left-4 top-1 w-2 h-2 rounded-full ring-4 ring-white ${getDotColorStyle(activity.targetType)}`}
              />

              <p className="text-dark text-[11px] leading-normal">{activity.summary}</p>
              <span className="text-[10px] text-lighttext mt-1 font-normal">
                {getRelativeTimeString(activity.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
};
