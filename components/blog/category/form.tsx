"use client";

import React, { useState } from "react";

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface AddCategoryFormProps {
  onSubmit: (data: CategoryFormData) => void;
}

const PRESET_COLORS = [
  { name: "orange", class: "bg-orange-500" },
  { name: "blue", class: "bg-blue-600" },
  { name: "green", class: "bg-emerald-600" },
  { name: "purple", class: "bg-indigo-600" },
  { name: "brown", class: "bg-amber-800" },
];

export default function AddCategoryForm({ onSubmit }: AddCategoryFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-orange-500");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name ) return;
    
    onSubmit({ name, slug, description, color: selectedColor });
    
    // Clear inputs upon submission
    setName("");
    setSlug("");
    setDescription("");
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Add a category</h2>
        <p className="text-xs text-gray-400 mt-0.5 max-w-60 leading-relaxed">
          Keep the list short — five to eight categories is usually enough.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tyres & Wheels"
            className="w-full px-3 py-2 border border-lightborder rounded-lg text-xs placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        {/* Slug Input */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="tyres-wheels"
            className="w-full px-3 py-2 border border-lightborder rounded-lg text-xs placeholder-gray-300 bg-gray-50 text-gray-500 font-mono focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="One line shown on the category page"
            rows={3}
            className="w-full px-3 py-2 border border-lightborder rounded-lg text-xs placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none"
          />
        </div>

        {/* Color Palette Select */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Colour
          </label>
          <div className="flex items-center gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.class)}
                className={`w-6 h-6 rounded-md transition-transform ${color.class} ${
                  selectedColor === color.class ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-aorange hover:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-lg text-xs transition-colors shadow-sm"
        >
          Add category
        </button>
      </form>
    </div>
  );
}
