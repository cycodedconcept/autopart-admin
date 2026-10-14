"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import MetricCard from "@/components/dashboard/metricCard";
import { SearchInput } from "@/components/atoms/searchInputs";
import { Pagination } from "@/components/atoms/pagination";
import { StatusBadge } from "@/components/atoms/statusBadge";
import CurrencyFormat from "@/components/atoms/currencyFormat";
import { AssignRiderModal } from "@/components/riders/assignRiderModal";
import {
  useAllRidersQuery,
  useAssignDeliveryJobMutation,
  useCompanyQuery,
  useDeliveryJobsQuery,
} from "@/lib/queries";
import { DeliveryJob } from "@/types/deliveryJob";

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Assigned", value: "assigned" },
  { label: "Picked up", value: "picked_up" },
  { label: "In transit", value: "in_transit" },
  { label: "Delivered", value: "delivered" },
  { label: "Failed", value: "failed" },
  { label: "Cancelled", value: "cancelled" },
];

const selectClass =
  "px-3 py-2.5 border border-lightborder rounded-lg text-sm bg-white text-navgray focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 cursor-pointer";

const thClass = "p-4 text-xs font-medium text-navgray tracking-wider text-left";

export function DeliveryJobsQueue() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [companyId, setCompanyId] = useState("");
  const [riderId, setRiderId] = useState("");
  const [selectedJob, setSelectedJob] = useState<DeliveryJob | null>(null);

  const { data, isLoading, isError, error } = useDeliveryJobsQuery(
    page,
    status,
    companyId,
    riderId,
    search,
  );
  const { data: companies } = useCompanyQuery(1, "approved", "");
  const { data: riders } = useAllRidersQuery();
  const assignJob = useAssignDeliveryJobMutation();

  const jobs = data?.data?.jobs ?? [];
  const totalPages = data?.data?.pagination?.totalPages ?? 0;
  const byStatus = data?.data?.summary?.jobsByStatus;
  const metrics = data?.data?.summary?.deliveryMetrics;
  const riderList = riders?.data?.riders ?? [];

  // Any filter change goes back to the first page
  const withReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const handleAssign = (riderIdValue: number, note: string) => {
    if (!selectedJob) return;
    assignJob.mutate(
      {
        jobId: selectedJob.id,
        data: { riderId: riderIdValue, ...(note ? { note } : {}) },
      },
      { onSuccess: () => setSelectedJob(null) },
    );
  };

  const statusCards = [
    { title: "Total", value: byStatus?.total },
    { title: "Pending", value: byStatus?.pending },
    { title: "Assigned", value: byStatus?.assigned },
    { title: "Picked up", value: byStatus?.picked_up },
    { title: "In transit", value: byStatus?.in_transit },
    { title: "Delivered", value: byStatus?.delivered },
    { title: "Failed", value: byStatus?.failed },
    { title: "Cancelled", value: byStatus?.cancelled },
  ];

  const moneyCards = [
    {
      title: "Completion rate",
      value:
        metrics?.completionRatePercent !== undefined
          ? `${metrics.completionRatePercent}%`
          : undefined,
    },
    {
      title: "Delivery fees",
      value: metrics && CurrencyFormat(metrics.deliveryFeesKobo),
    },
    {
      title: "Platform margin",
      value: metrics && CurrencyFormat(metrics.platformMarginKobo),
    },
    {
      title: "Company share",
      value: metrics && CurrencyFormat(metrics.companyShareKobo),
    },
    {
      title: "Avg delivery fee",
      value: metrics && CurrencyFormat(metrics.averageDeliveryFeeKobo),
    },
  ];

  return (
    <div>
      {/* Status counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 mb-3">
        {statusCards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value ?? 0}
            valueStyle="text-dark text-xl font-bold"
            titleStyle="text-navgray font-sm"
            divStyle=""
          />
        ))}
      </div>

      {/* Delivery finance metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
        {moneyCards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value ?? "—"}
            valueStyle="text-dark text-xl font-bold"
            titleStyle="text-navgray font-sm"
            divStyle=""
          />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center mb-4">
        <SearchInput
          className="w-full md:w-2/5"
          padd="py-3 px-4"
          placeholder="Search job ID, order, buyer or location..."
          value={search}
          onChange={withReset(setSearch)}
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={companyId}
            onChange={(e) => withReset(setCompanyId)(e.target.value)}
            className={selectClass}
          >
            <option value="">All Companies</option>
            {companies?.data?.companies?.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <select
            value={riderId}
            onChange={(e) => withReset(setRiderId)(e.target.value)}
            className={selectClass}
          >
            <option value="">All Riders</option>
            {riderList.map((rider) => (
              <option key={rider.id} value={rider.id}>
                {rider.fullName}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => withReset(setStatus)(e.target.value)}
            className={selectClass}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs table */}
      <div className="w-full overflow-x-auto bg-white border border-lightborder rounded-lg min-h-60">
        <table className="w-full min-w-max table-auto text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-background">
              <th className={thClass}>Job ID</th>
              <th className={thClass}>Order ID</th>
              <th className={thClass}>Part Name</th>
              <th className={thClass}>Seller (Pickup)</th>
              <th className={thClass}>Buyer (Delivery)</th>
              <th className={thClass}>Company</th>
              <th className={thClass}>Rider</th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={9} className="py-10">
                  <Loader2 className="w-5 h-5 animate-spin text-navgray mx-auto" />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-10 text-center text-sm text-rose-500"
                >
                  <span className="inline-flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error?.message || "Unable to load delivery jobs"}
                  </span>
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-10 text-center text-sm text-navgray"
                >
                  No delivery jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const canAssign = !job.riderId && job.status === "pending";
                const delivery = job.order?.deliveryAddress;
                return (
                  <tr
                    key={job.id}
                    className="hover:bg-gray-50/50 transition-colors text-sm text-navgray"
                  >
                    <td className="p-4 font-medium text-aorange">
                      {job.jobCode}
                    </td>
                    <td className="p-4">#{job.orderId}</td>
                    <td
                      className="p-4 text-dark max-w-48 truncate"
                      title={job.item?.title}
                    >
                      {job.item?.title ?? "—"}
                    </td>
                    <td className="p-4">{job.seller?.businessName ?? "—"}</td>
                    <td className="p-4">
                      <p className="text-dark capitalize">
                        {job.buyer?.fullName ?? "—"}
                      </p>
                      {delivery && (
                        <p className="text-xs">{`${delivery.city}, ${delivery.state}`}</p>
                      )}
                    </td>
                    <td className="p-4">{job.assignedCompany?.name ?? "—"}</td>
                    <td className="p-4">
                      {job.assignedRider?.fullName ?? (
                        <span className="text-rose-500">Unassigned</span>
                      )}
                    </td>
                    <td className="p-4 capitalize">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="p-4">
                      {canAssign ? (
                        <button
                          type="button"
                          onClick={() => setSelectedJob(job)}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-aorange hover:bg-orange-600 rounded-md transition-colors cursor-pointer"
                        >
                          Assign
                        </button>
                      ) : (
                        <span className="text-lighttext">—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <AssignRiderModal
        // Remount per job so the form starts empty each time
        key={selectedJob?.id ?? "none"}
        job={selectedJob}
        companies={companies?.data?.companies ?? []}
        onClose={() => setSelectedJob(null)}
        onSubmit={handleAssign}
        isSubmitting={assignJob.isPending}
      />
    </div>
  );
}
