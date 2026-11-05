import React, { useEffect } from "react";
import { X, Phone, MapPin, Truck } from "lucide-react";
import { StatusBadge } from "../atoms/statusBadge";
import { Rider } from "@/types/rider";
import { formatDateLabelYear } from "../atoms/formatDate";

interface RiderProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  riderId: number | string | null;
  riders: Rider[] | [];
}

export function RiderProfileDrawer({
  isOpen,
  onClose,
  riderId,
  riders,
}: RiderProfileDrawerProps) {
  // Prevent background scrolling when slide-over is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getRiderData = (id: number | string | null): Rider | null => {
    const targetId = typeof id === "string" ? Number(id) : id;
    if (!targetId || riders?.length === 0) return null;
    return riders.find((each) => each.id === targetId) ?? null;
  };

  const rider = getRiderData(riderId);

  if (!rider) return null;

  const getRider = rider.fullName.split(" ");
  let initials;
  if (getRider) {
    if (getRider.length > 1) {
      const first = getRider[0][0].toUpperCase();
      const second = getRider[1][0].toUpperCase();
      initials = first + second;
    } else {
      const first = getRider[0][0].toUpperCase();
      initials = first;
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end overflow-hidden transition-all duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Drawer Panel */}
      <div
        className={`relative w-11/12 md:w-full max-w-md h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-lightborder">
          <h2 className="text-lg font-medium text-dark">Rider Profile</h2>
          <button
            onClick={onClose}
            className="text-navgray hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Info */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 font-semibold text-lg shrink-0">
              {initials}
            </div>
            <div className="space-y-1 font-sm text-navgray capitalize">
              <h3 className="text-lg font-medium  text-dark">
                {rider.fullName}
              </h3>
              <p className="text-sm ">{rider.company.name}</p>
              <StatusBadge status={rider.status} />
            </div>
          </div>

          {/* Contact & Status Details */}
          <div className="space-y-3 text-sm text-navgray">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <span>{rider.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 " />
              <span>{rider.zone.state}</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4" />
              {/* <span>Active deliveries: {rider.activeDeliveriesCount}</span> */}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-background p-3 rounded-lg text-center">
              {/* <div className="text-xl font-bold text-dark">{rider.rating}</div> */}
              <div className="text-xs text-navgray mt-0.5">Rating</div>
            </div>
            <div className="bg-background p-3 rounded-lg text-center">
              <div className="text-xl font-bold text-dark">
                {/* {rider.activeCount} */}
              </div>
              <div className="text-xs text-navgray mt-0.5">Active</div>
            </div>
            <div className="bg-background p-3 rounded-lg text-center">
              <div className="text-xl font-bold text-dark">
                {/* {rider.totalCount} */}
              </div>
              <div className="text-xs text-navgray mt-0.5">Total</div>
            </div>
          </div>

          {/* Recent Deliveries */}
          <div className="font-medium text-dark">
            <h4 className="text-lg mb-3">Recent Deliveries</h4>
            {/* <div className="divide-y divide-lightborder">
              {rider.recentDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex justify-between items-center py-3 text-sm font-normal border-b border-lightborder"
                >
                  <span className="font-medium ">{delivery.id}</span>
                  <span className="text-navgray">{delivery.location}</span>
                  
                  <StatusBadge status={delivery.status} />
                </div>
              ))}
            </div> */}
          </div>

          {/* Footer date */}
          <div className="text-xs text-lighttext ">
            Joined: {formatDateLabelYear(rider.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
