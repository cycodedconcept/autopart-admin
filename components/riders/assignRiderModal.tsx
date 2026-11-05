"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { DeliveryJob } from "@/types/deliveryJob";
import { Company, Rider } from "@/types/rider";
import { useCompanyRiderQuery } from "@/lib/queries";

interface AssignRiderModalProps {
  job: DeliveryJob | null;
  companies: Pick<Company, "id" | "name">[];
  onClose: () => void;
  onSubmit: (riderId: number, note: string) => void;
  isSubmitting: boolean;
}

export function AssignRiderModal({
  job,
  companies,
  onClose,
  onSubmit,
  isSubmitting,
}: AssignRiderModalProps) {
  const [companyId, setCompanyId] = useState(
    job?.companyId?.toString() ?? "",
  );
  const [riderId, setRiderId] = useState("");

  // Riders belonging to the selected company
  const { data: companyRiders, isFetching: isLoadingRiders } =
    useCompanyRiderQuery(
      1,
      "all",
      companyId,
      { enabled: !!job && !!companyId },
      100,
    );
  const riders = companyId ? (companyRiders?.data?.riders ?? []) : [];

  const handleCompanyChange = (value: string) => {
    setCompanyId(value);
    setRiderId("");
  };
  const [note, setNote] = useState("");

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (job) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [job, onClose]);

  if (!job) return null;

  // Keep the job's own company selectable even when it is not in the list
  const assignedCompany = job.assignedCompany;
  const companyOptions =
    assignedCompany && !companies.some((c) => c.id === assignedCompany.id)
      ? [assignedCompany, ...companies]
      : companies;

  // Riders in the job's zone first, then available riders, then the rest
  const sortedRiders = [...riders].sort((a, b) => {
    const score = (r: Rider) =>
      (r.zoneId === job.zoneId ? 2 : 0) + (r.status === "available" ? 1 : 0);
    return score(b) - score(a);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riderId) return;
    onSubmit(Number(riderId), note.trim());
  };

  const deliveryAddress = job.order?.deliveryAddress;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white rounded-xl shadow-2xl flex flex-col transform transition-all duration-300 border border-neutral-100"
      >
        {/* Header Block */}
        <div className="flex justify-between items-start px-6 py-4 border-b border-neutral-100">
          <div>
            <h2 className="text-lg font-medium text-dark">
              Manually Assign Rider
            </h2>
            <p className="text-xs text-navgray mt-0.5">
              {job.jobCode} · Order #{job.orderId}
              {job.item?.title ? ` · ${job.item.title}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-lighttext hover:text-neutral-600 p-1.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm text-navgray font-medium">
          {/* Job context */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-50 border border-neutral-100 rounded-lg p-3">
            <div>
              <p className="text-lighttext uppercase">Pickup</p>
              <p className="text-dark mt-0.5 normal-case">
                {job.seller?.businessName ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-lighttext uppercase">Delivery</p>
              <p className="text-dark mt-0.5 normal-case">
                {deliveryAddress
                  ? `${deliveryAddress.city}, ${deliveryAddress.state}`
                  : "—"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Logistics Company</label>
            <select
              value={companyId}
              onChange={(e) => handleCompanyChange(e.target.value)}
              required
              className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            >
              <option value="" disabled hidden>
                — Choose a company —
              </option>
              {companyOptions.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Select Rider</label>
            <select
              value={riderId}
              onChange={(e) => setRiderId(e.target.value)}
              required
              disabled={!companyId || isLoadingRiders}
              className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all disabled:bg-neutral-50 disabled:text-lighttext"
            >
              <option value="" disabled hidden>
                {!companyId
                  ? "Select a company first"
                  : isLoadingRiders
                    ? "Loading riders..."
                    : "— Choose a rider —"}
              </option>
              {sortedRiders.map((rider) => (
                <option key={rider.id} value={rider.id}>
                  {rider.fullName}
                  {rider.zone?.city ? ` (${rider.zone.city})` : ""}
                  {` · ${rider.status.replace(/_/g, " ")}`}
                </option>
              ))}
            </select>
            {companyId && !isLoadingRiders && riders.length === 0 && (
              <p className="text-xs text-rose-500">
                This company has no riders yet.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label>
              Reason / Note <span className="text-lighttext">(optional)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="e.g. Closest rider or partner capacity issue"
              className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer Actions Panel */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-neutral-50 rounded-b-xl border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-navgray border border-lightborder hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !riderId}
            className="px-4 py-2 text-sm font-medium text-white bg-aorange hover:bg-[#E04F00] active:bg-[#C24400] rounded-lg border border-aorange transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Assign Rider"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
