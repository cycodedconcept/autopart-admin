"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface OnboardPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: OnboardPartnerPayload) => void;
  isSubmitting: boolean;
  apiError: string | null;
}

export interface OnboardPartnerPayload {
  companyName: string;
  city: string;
  contactName: string;
  phone: string;
  email: string;
  contractType: string;
  commissionRate: number;
}

export function CompanyModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  apiError,
}: OnboardPartnerModalProps) {
  const [formData, setFormData] = useState<OnboardPartnerPayload>({
    companyName: "",
    city: "",
    contactName: "",
    phone: "",
    email: "",
    contractType: "",
    commissionRate: 0,
  });

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "commissionRate" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop overlay matching image's subtle transparency */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
      />

      {/* Main Form container */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl flex flex-col transform transition-all duration-300 border border-neutral-100"
      >
        {/* Header Block */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-100">
          <h2 className="text-lg font-medium text-dark">
            Onboard Partner
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-lighttext hover:text-neutral-600 p-1.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {apiError && (
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg text-xs font-medium border border-rose-100">
            {apiError}
          </div>
        )}
        {/* Form Body Fields */}
        <div className="p-6 space-y-4 text-sm max-h-[calc(100vh-160px)] overflow-y-auto text-navgray font-medium ">
          {/* Company Name */}
          <div className="flex flex-col gap-1.5">
            <label className="">Company name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Lagos Speed Couriers"
              required
              className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className="font-medium ">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Lagos"
              required
              className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Inline Row 1: Contact Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="">
                Contact name
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="080X XXX XXXX"
                required
                className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@company.com"
              required
              className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Inline Row 2: Contract Type & Commission Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="">
                Contract type
              </label>
              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              >
                <option value="" disabled hidden>
                  Select contract type
                </option>
                <option value="freelance">Freelance</option>
                <option value="third_party">Third Party Logistics (3PL)</option>
                <option value="exclusive">Exclusive Partner</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="">
                Commission rate (%)
              </label>
              <input
                type="number"
                name="commissionRate"
                value={formData.commissionRate || ""}
                onChange={handleChange}
                placeholder="e.g. 10"
                min="0"
                max="100"
                required
                className="w-full px-3 py-2 border border-lightborder rounded-lg text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
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
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-aorange hover:bg-[#E04F00] active:bg-[#C24400] rounded-lg border border-aorange transition-colors cursor-pointer"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Onboard partner"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
